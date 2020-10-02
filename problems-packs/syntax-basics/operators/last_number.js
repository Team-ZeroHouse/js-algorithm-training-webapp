(function()
{
  const problem = {"title":"마지막 수","content":"입력 받은 정수의 1의 자리의 수를 출력하라.\n\n### 입력\n정수 하나가 입력된다.\n\n### 출력\n일의 자리 수를 출력하라.","openTestCases":[{"input":"123","output":"3"},{"input":"324235","output":"5"},{"input":"2","output":"2"}],"randomTestCase":"const num = Math.floor(Math.random() * 10000);\r\nconst lastNum = num % 10;\r\n\r\nprintInput(num);\r\nprintOutput(lastNum);","solution":"const num = parseInt(readline());\r\nconst last = num % 10;\r\nprint(last);"}
  loadedProblem(problem);
})();