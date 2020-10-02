(function()
{
  const problem = {"title":"십의 자리","content":"정수 하나를 입력 받고 10의 자리 숫자를 출력하라.\n\n### 입력\n정수하나를 입력으로 준다.\n입력으로 주어지는 숫자는 반드시 10보다 크다.\n\n### 출력\n10의 자리를 출력하라.","openTestCases":[{"input":"123","output":"2"},{"input":"235235","output":"3"},{"input":"12","output":"1"}],"randomTestCase":"const n = Math.floor(Math.random() * 10000) + 10;\r\nprintInput(n);\r\nconst ten = Math.floor(n % 100 / 10);\r\nprintOutput(ten);","solution":"const n = parseInt(readline());\r\nconst remainder100 = n % 100;\r\nconst ten = Math.floor(remainder100 / 10);\r\nprint(ten);"}
  loadedProblem(problem);
})();