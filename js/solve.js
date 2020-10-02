window.loadedProblem = undefined;
(function()
{
  let theProblem;
  let editor;
  const randomTestCases = [];

  function preventExit(e)
  {
    e.preventDefault();
    e.returnValue = '';
  }

  window.addEventListener('beforeunload', preventExit);

  window.loadedProblem = function(problem)
  {
    theProblem = problem;

    $('#title').text('제목: ' + problem.title??'');
    $('#content-viewer').toastuiEditor('setMarkdown', problem.content??'');
    problem.openTestCases.forEach(openTestCase =>
    {
      addTextCase(openTestCase);
    });
    
    if (problem.randomTestCase && problem.randomTestCase.trim().length > 0)
    {
      for (let i = 0; i < 100; i++)
      {
        const inputLines = [];
        const outputLines = [];
        
        function printInput(line)
        {
          inputLines.push(line);
        }

        function printOutput(line)
        {
          outputLines.push(line);
        }

        const code = problem.randomTestCase
          .replace(/(?<!\.)printInput/g, 'arguments[0]')
          .replace(/(?<!\.)printOutput/g, 'arguments[1]');
        const randomTestCaseMakerFunction = new Function(code);
        randomTestCaseMakerFunction.apply(null, [printInput, printOutput]);

        randomTestCases.push({
          input: inputLines.join('\n'),
          output: outputLines.join('\n')
        });
      }
    }
  };

  function addTextCase(openTestCase)
  {
    const $li = $(`
    <li>
      <textarea class="input" readonly style="width: 300px; height: 100px;">${openTestCase.input}</textarea>
      <textarea class="output" readonly style="width: 300px; height: 100px;">${openTestCase.output}</textarea>
      <button type="button">Run</button>
      <textarea class="result" readonly style="width: 300px; height: 100px;"></textarea>
    </li>
    `);
    $li.find('button').click(function()
    {
      const result = test(openTestCase);
      $li.find('.result').val(result);
    });
    $('#open-test-case-list').append($li);
  }

  function test(testCase)
  {
    let solutionResult = '';
    let output = '';
    
    const inputs = testCase.input.split(/\r?\n/);
    let currentInputIndex = -1;
    function readline()
    {
      if (++currentInputIndex < inputs.length)
      {
        return inputs[currentInputIndex];
      }

      return '';
    }

    function print(msg)
    {
      output += msg.toString() + '\n';
    }
    
    const editedCode = editor.getValue()
      .replace(/(?<!\.)readline/g, 'arguments[0]')
      .replace(/(?<!\.)print/g, 'arguments[1]');
    const codeFunction = new Function(editedCode);
    try
    {
      codeFunction.apply(null, [readline, print]);
    }
    catch(e)
    {
      solutionResult += 'Failed.\n';
      solutionResult += e.toString();
      return solutionResult;
    }

    output = output.trimEnd();
    if (output == testCase.output)
    {
      solutionResult += 'Success.\n\n';
    }
    else
    {
      solutionResult += 'We expected...\n';
      solutionResult += testCase.output;
      solutionResult += '\nBut Your answer is...\n';
      solutionResult += output ? output : "'#empty'";
      solutionResult += '\nThe input is...\n';
      solutionResult += testCase.input;
    }

    return solutionResult;
  }

  // 아래 부터 초기화 코드

  const keyValues = location.href.substring(location.href.indexOf('?')+1).split('&').map(function(p) {
    const keyValue = p.split('=');
    return {
      key: keyValue[0],
      value: keyValue[1]
    };
  });
  const query = {};
  keyValues.forEach(function(pair) {
    query[pair.key] = pair.value;
  });

  const s = document.createElement('script');
  s.src = `problems-packs/${query.pack}/${query.level}/${query.problem}.js`;
  document.body.appendChild(s);

  $('#content-viewer').toastuiEditor();

  require.config({ paths: { vs: 'vs' } });
  require(['vs/editor/editor.main'], function()
  {
    const libSource = [
      'declear function readline(): string',
      'declear function print(line: string): void'
    ].join('\n');
    const libUri = 'ts:filename/stdio.d.ts';
    monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
    monaco.editor.createModel(libSource, 'javascript', monaco.Uri.parse(libUri));
    
    editor = monaco.editor.create(
      document.getElementById('editor'),
      {
        language: 'javascript'
      }
    )
  });

  $('#show-solution-button').click(function()
  {
    if (confirm('진짜 볼꺼에요?'))
    {
      $('#output').val(theProblem.solution);
    }
  });

  $('#run-all-button').click(function()
  {
    $('#open-test-case-list button').click();
  });

  $('#solve-button').click(function()
  {
    $('#run-all-button').click();
    const failCount = $('#open-test-case-list .result').filter((i,x) => x.value.trim() !== 'Success.').length;
    if (failCount > 0)
    {
      $('#output').val('오픈 테스트 케이스 통과 실패');
      return;
    }

    let output = '오픈 테스트 케이스 통과.\n\n';
    let success = true;

    let randomTestCasePass = true;
    for (const testCase of randomTestCases)
    {
      const result = test(testCase);
      if (result.trim() !== 'Success.')
      {
        output += result;
        output += '\n\n랜덤 테스트 케이스 불통과\n\n불합격!';
        randomTestCasePass = false;
        success = false;
        break;
      }
    }

    if (randomTestCasePass)
    {
      output += '랜덤 테스트 케이스 통과.\n\n합격!';
    }

    if (success)
    {
      $('#exit-button').show();
    }

    $('#output').val(output);
  });

  $('#exit-button').click(function()
  {
    window.removeEventListener('beforeunload', preventExit);
    history.back();
  });
  
})();