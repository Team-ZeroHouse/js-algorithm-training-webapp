$(function()
{
  $('#content-editor').toastuiEditor({
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical'
  });

  let solutionEditor;
  let randomTestCaseEditor;
  require.config({ paths: { vs: 'vs' } });
  require(['vs/editor/editor.main'], function()
  {
    const libSource = [
      'declear function readline(): string',
      'declear function print(line: string): void',
      'declear function printInput(line: string): void',
      'declear function printOutput(line: string): void'
    ].join('\n');
    const libUri = 'ts:filename/stdio.d.ts';
    monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
    monaco.editor.createModel(libSource, 'javascript', monaco.Uri.parse(libUri));

    solutionEditor = monaco.editor.create(
      document.getElementById('solution-editor'),
      {
        language: 'javascript'
      }
    );
    randomTestCaseEditor = monaco.editor.create(
      document.getElementById('random-test-case-editor'),
      {
        language: 'javascript'
      }
    );
  });

  function addOpenTestCase(input, output)
  {
    const $ol = $('#open-test-case-list');
    const $li = $(`
    <li>
      <textarea class="input" style="width: 400px; height: 100px;">${input??''}</textarea>
      <textarea class="output" style="width: 400px; height: 100px;">${output??''}</textarea>
    </li>
    `);
    const $removeButton = $('<button type="button">remove</button>');
    $removeButton.click(function()
    {
      $(this).parent().remove();
    });
    $li.append($removeButton);
    $ol.append($li);
  }

  $('#open-test-case-add-button').click(function()
  {
    addOpenTestCase();
  });

  $('#run-button').click(function()
  {
    if ($('#open-test-case-list li').length === 0)
    {
      alert('no test cases');
      return;
    }

    const openTestCases = $('#open-test-case-list li').map((i,li) => ({ input: $(li).find('.input').val().trimEnd(), output: $(li).find('.output').val().trimEnd() })).toArray();
    const randomTestCaseCode = randomTestCaseEditor.getValue().trim();
    const code = solutionEditor.getValue();
    let solutionResult = '';

    function runTestCase(type, testCase, testCaseNumber)
    {
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
      
      const editedCode = code
        .replace(/(?<!\.)readline/g, 'arguments[0]')
        .replace(/(?<!\.)print/g, 'arguments[1]');
      const codeFunction = new Function(editedCode);
      solutionResult += `--- ${type} #${testCaseNumber} ---\n`;
      try
      {
        codeFunction.apply(null, [readline, print]);
      }
      catch(e)
      {
        solutionResult += 'Failed.\n';
        solutionResult += e.toString();
        return false;
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

        return false;
      }

      return true;
    }

    let openTestCaseSuccess = true;
    for (let i = 0; i < openTestCases.length; i++)
    {
      const testCase = openTestCases[i];
      const result = runTestCase('Open Test Case', testCase, i+1);
      if (!result)
      {
        openTestCaseSuccess = false;
        break;
      }
    }

    if (openTestCaseSuccess && randomTestCaseCode.length > 0)
    {
      const editedrandomTestCaseCode = randomTestCaseCode
        .replace(/(?<!\.)printInput/g, 'arguments[0]')
        .replace(/(?<!\.)printOutput/g, 'arguments[1]');
      const randomTestCaseMakerFunction = new Function(editedrandomTestCaseCode);

      for (let i = 1; i <= 100; i++)
      {
        const inputLines = [];
        function printInput(line)
        {
          inputLines.push(line);
        }

        const outputLines = [];
        function printOutput(line)
        {
          outputLines.push(line);
        }

        randomTestCaseMakerFunction.apply(null, [printInput, printOutput]);
        const testCase = {
          input: inputLines.join('\n'),
          output: outputLines.join('\n')
        };
        
        const result = runTestCase('Random Test Case', testCase, i);
        if (!result)
        {
          break;
        }
      }
    }

    $('#solution-result').val(solutionResult);
  });

  $('#problem-load-button').click(function()
  {
    const json = $('#problem-input').val();
    const problem = JSON.parse(json);
    
    $('input[name=title]').val(problem.title??'');
    $('#content-editor').toastuiEditor('setMarkdown', problem.content??'');
    $('#open-test-case-list').html('');
    problem.openTestCases.forEach(testCase =>
    {
      addOpenTestCase(testCase.input, testCase.output);
    });
    solutionEditor.setValue(problem.solution??'');
    randomTestCaseEditor.setValue(problem.randomTestCase??'');
  })

  $('#problem-make-button').click(function()
  {
    const problem = {
      title: $('input[name=title]').val(),
      content: $('#content-editor').toastuiEditor('getMarkdown'),
      openTestCases: $('#open-test-case-list li').map((i,li) => ({ input: $(li).find('.input').val().trimEnd(), output: $(li).find('.output').val().trimEnd() })).toArray(),
      randomTestCase: randomTestCaseEditor.getValue(),
      solution: solutionEditor.getValue()
    };
    $('#problem-output').val(JSON.stringify(problem));
  })

  window.addEventListener('beforeunload', function(e)
  {
    e.preventDefault();
    e.returnValue = '';
  });
})