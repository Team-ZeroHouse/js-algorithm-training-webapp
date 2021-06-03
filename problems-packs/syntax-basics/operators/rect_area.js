(function()
{
  const problem = {"title":"직사각형 넓이 구하기","content":"직사각형의 넓이는 밑변과 높이의 곱이다.\n직사각형의 넓이를 출력하라.\n\n### 입력\n밑변과 높이가 공백을 기준으로 한줄에 출력된다.\n\n### 출력\n직사각형의 넓이를 출력하라.","openTestCases":[{"input":"5 2","output":"10"},{"input":"3 4","output":"12"},{"input":"10 24","output":"240"}],"randomTestCase":"const l = Math.floor(Math.random() * 1000);\r\nconst h = Math.floor(Math.random() * 1000);\r\nprintInput([l, h].join(' '))\r\nprintOutput(l*h);","solution":"const splited = readline().split(' ');\r\nconst l = parseInt(splited[0]);\r\nconst h = parseInt(splited[1]);\r\nprint(l*h);"}
  loadedProblem(problem);
})();