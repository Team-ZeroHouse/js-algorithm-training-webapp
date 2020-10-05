const save = (function()
{
  const KEY = 'js-algorithm-training-webapp';
  let _data = null;

  function load()
  {
    const savedDataJson = localStorage.getItem(KEY);
    if (savedDataJson !== null)
    {
      try
      {
        _data = JSON.parse(savedDataJson);
      }
      catch
      {
        localStorage.removeItem(KEY);
      }
    }
    else
    {
      _data = { };
    }
  }

  function updateCode(problemPackId, levelId, problemId, code)
  {
    if (_data === null)
    {
      load();
    }

    if (!(problemPackId in _data))
    {
      _data[problemPackId] = { };
    }

    if (!(levelId in _data[problemPackId]))
    {
      _data[problemPackId][levelId] = { }
    }

    if (!(problemId in _data[problemPackId][levelId]))
    {
      _data[problemPackId][levelId][problemId] = {
        code: '',
        pass: false
      };
    }

    _data[problemPackId][levelId][problemId].code = code;
    localStorage.setItem(KEY, JSON.stringify(_data));
  }

  function getCode(problemPackId, levelId, problemId)
  {
    if (_data === null)
    {
      load();
    }

    if (!(problemPackId in _data))
    {
      return '';
    }

    if (!(levelId in _data[problemPackId]))
    {
      return '';
    }

    if (!(problemId in _data[problemPackId][levelId]))
    {
      return '';
    }

    return _data[problemPackId][levelId][problemId].code || '';
  }

  function pass(problemPackId, levelId, problemId)
  {
    if (_data === null)
    {
      load();
    }

    if (!(problemPackId in _data))
    {
      _data[problemPackId] = { };
    }

    if (!(levelId in _data[problemPackId]))
    {
      _data[problemPackId][levelId] = { }
    }

    if (!(problemId in _data[problemPackId][levelId]))
    {
      _data[problemPackId][levelId][problemId] = {
        code: '',
        pass: false
      };
    }

    _data[problemPackId][levelId][problemId].pass = true;
    localStorage.setItem(KEY, JSON.stringify(_data));
  }

  function isPassed(problemPackId, levelId, problemId)
  {
    if (_data === null)
    {
      load();
    }

    if (!(problemPackId in _data))
    {
      return false;
    }

    if (!(levelId in _data[problemPackId]))
    {
      return false;
    }

    if (!(problemId in _data[problemPackId][levelId]))
    {
      return false;
    }

    return !!_data[problemPackId][levelId][problemId].pass;
  }

  return {
    updateCode,
    getCode,
    pass,
    isPassed
  };
})();