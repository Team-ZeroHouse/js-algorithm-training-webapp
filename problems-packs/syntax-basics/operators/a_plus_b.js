(function()
{
  const problem = {"title":"A + B","content":"정수 A와 B가 한줄로 입력된다.\n\n두수를 더하고 출력하여라.","openTestCases":[{"input":"1 3","output":"4"},{"input":"4 6","output":"10"}],"randomTestCase":"const a = Math.floor(Math.random() * 100000 - 50000);\r\nconst b = Math.floor(Math.random() * 100000 - 50000);\r\nprintInput([a, b].join(' '));\r\nprintOutput(a + b);","solution":"const splited = readline().split(' ');\r\nconst a = parseInt(splited[0]);\r\nconst b = parseInt(splited[1]);\r\n\r\nprint(a + b);"}
  loadedProblem(problem);
})();