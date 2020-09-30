(function()
{
  const problem = {"title":"수의 평균 구하기","content":"두수를 입력 받고 평균을 출력하라.\n\n### 입력\n한줄씩 두개의 실수가 입력된다.\n\n### 출력\n두 수의 평균을 출력하라.\n소수 3째자리에서 반올림하여 출력하라.","openTestCases":[{"input":"2\n3","output":"2.5"}],"randomTestCase":"const a = Math.random() * 10000;\r\nconst b = Math.random() * 10000;\r\nconst mean = Math.round((a + b) / 2 * 100) / 100;\r\nprintInput(a);\r\nprintInput(b);\r\nprintOutput(mean);","solution":"const a = parseFloat(readline());\r\nconst b = parseFloat(readline());\r\nconst s = a + b;\r\nconst mean = Math.round(s / 2 * 100) / 100;\r\n\r\nprint(mean);"}
  loadedProblem(problem);
})();