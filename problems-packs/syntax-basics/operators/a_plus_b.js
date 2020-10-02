(function()
{
  const problem = {"title":"A + B","content":"공백(스페이스)를 기준으로 문자열을 쪼개서 배열로 반환하고 싶다면 split(' ')을 사용해야 한다.\n만약 '1 3'.split(' ')을 하면 ['1', '3']이 반환된다.\n그렇기에 이 문제에서는 readline().split(' ')을 해야한다.\n\n문자열을 정수로 만들기 위해서는 parseInt 함수를 사용해야한다.\nparseInt('3')을 하면 3이 반환된다.\n\n### 입력\n공백을 기준으로 구분되게 정수 a와 b가 한줄로 입력된다.\n\n### 출력\n이 두 정수 a와 b를 더해서 출력하라.","openTestCases":[{"input":"1 3","output":"4"},{"input":"421233 12334","output":"433567"}],"randomTestCase":"const a = Math.floor(Math.random() * 10000 - 5000);\r\nconst b = Math.floor(Math.random() * 10000 - 5000);\r\nprintInput([a, b].join(' '));\r\nprintOutput(a+b);","solution":"const splited = readline().split(' ');\r\nconst a = parseInt(splited[0]);\r\nconst b = parseInt(splited[1]);\r\n\r\nprint(a + b);"}
  loadedProblem(problem);
})();