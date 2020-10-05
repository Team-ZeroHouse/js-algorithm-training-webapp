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

    $('#title').text(problem.title??'');
    $('#content-viewer').toastuiEditor('setMarkdown', problem.content??'');
    problem.openTestCases.forEach((testCase, i) =>
    {
      addTextCase(i);
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

  function addTextCase(index)
  {
    const $li = $(`
      <li class="test-case">
        <span>Test Case #${index + 1}</span>
        <button class="run" type="button"></button>
      </li>
    `);
    $li.find('button').click(function()
    {
      $(this).removeClass(['run', 'success', 'error']).addClass('processing')
      const testCase = theProblem.openTestCases[index];
      const result = test(testCase);
      if (result.success)
      {
        $(this).removeClass('processing').addClass('success');
        $('#output').val('');
      }
      else
      {
        $(this).removeClass('processing').addClass('error');
        testCaseErrorPrint(testCase, index, result);
      }
    });
    $('#test-case-list').append($li);
  }

  function test(testCase)
  {
    const testResult = {
      testCase,
      success: false
    };

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
    
    try
    {
      const codeFunction = new Function(editedCode);
      codeFunction.apply(null, [readline, print]);
    }
    catch(e)
    {
      testResult.success = false;
      if (e instanceof SyntaxError)
      {
        testResult.errorType = 'SYNTAX_ERROR';
      }
      else
      {
        testResult.errorType = 'RUN_TIME_ERROR';
      }
      
      testResult.error = e.toString();
      return testResult;
    }

    output = output.trimEnd();
    if (output == testCase.output)
    {
      testResult.success = true;
    }
    else
    {
      testResult.success = false;
      testResult.errorType = 'OUTPUT_MISMATCH';
      testResult.output = output;
    }

    return testResult;
  }

  function testCaseErrorPrint(testCase, opneTestIndex, testResult)
  {
    if (testResult.errorType === 'SYNTAX_ERROR')
    {
      let output = '==== 코드 문법 에러 ====\n\n';
      output += testResult.error;
      $('#output').val(output);
    }
    else if (testResult.errorType === 'RUN_TIME_ERROR')
    {
      let output = '==== 코드 실행중 에러 발생 ====\n\n';
      output += testResult.error;
      $('#output').val(output);
    }
    else if (testResult.errorType === 'OUTPUT_MISMATCH')
    {
      let output = '';
      if (opneTestIndex === undefined || opneTestIndex === null)
      {
        output += '==== 랜덤 테스트 케이스';
      }
      else
      {
        output += `==== 오픈 테스트 케이스 #${opneTestIndex + 1}`;
      }
      output += ' 출력 불일치 ====\n';
      output += '-- 기대한 값: --\n';
      output += testCase.output;
      output += '\n\n-- 출력된 값: --\n';
      output += testResult.output;
      output += '\n\n-- 입력: --\n';
      output += testCase.input;
      $('#output').val(output);
    }
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
    
    monaco.editor.setTheme('vs-dark');

    let code = save.getCode(query.pack, query.level, query.problem);
    if (code.trim().length === 0)
    {
      code = [
        '// readline()으로 한줄을 입력받을 수 있습니다.',
        '// print()를 통해서 한줄을 출력할 수 있습니다.',
        ''
      ].join('\n');
    }
    
    editor = monaco.editor.create(
      document.getElementById('editor'),
      {
        language: 'javascript',
        value: code
      }
    )
    editor.onDidChangeModelContent(function()
    {
      save.updateCode(query.pack, query.level, query.problem, editor.getValue());
    });
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
    const $buttons = $('li.test-case button');
    $buttons.removeClass(['processing', 'success', 'error']).addClass('run');
    for (let i = 0; i < theProblem.openTestCases.length; i++)
    {
      $buttons.eq(i).click();
      if ($buttons.eq(i).hasClass('error'))
      {
        break;
      }
    }
  });

  $('#solve-button').click(function()
  {
    $('#run-all-button').click();
    const succcessCount = $('li.test-case button.success').length;
    if (succcessCount !== theProblem.openTestCases.length)
    {
      return;
    }

    for (const testCase of randomTestCases)
    {
      const result = test(testCase);
      if (!result.success)
      {
        testCaseErrorPrint(testCase, null, result);
        return;
      }
    }

    window.removeEventListener('beforeunload', preventExit);
    save.pass(query.pack, query.level, query.problem);
    $('#output').val('합격');
  });

  $('#exit-button').click(function()
  {
    history.back();
  });
  
})();

/*

enum  TestError
{
  SyntaxError = 'SYNTAX_ERROR',
  RunTimeError = 'RUN_TIME_ERROR',
  OutputMismatch = 'OUTPUT_MISMATCH'
}

interface TestResult
{
  testCase: TestCase
  success: boolean
  output?: string
  errorType?: TestError
  error?: string
}

*/