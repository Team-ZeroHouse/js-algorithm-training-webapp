(function()
{
  const problem = {"title":"초를 시간 형식에 맞추기","content":"초를 받아서 시,분,초로 출력하는 문제이다.\n23423초는 6시 30분 24초로 나타낼 수 있다.\n\n## 입력\n정수로 초를 입력받는다.\n\n## 출력\n**h시 m분 s초** 형식으로 출력하라.\nh, m, s가 0이라면 0을 출력하면 된다.","openTestCases":[{"input":"34523","output":"9시 35분 23초"},{"input":"150","output":"0시 2분 30초"},{"input":"4532","output":"1시 15분 32초"}],"randomTestCase":"let s = Math.floor(Math.random() * 100000);\r\nprintInput(s);\r\n\r\nconst h = Math.floor(s / 3600);\r\ns = s % 3600;\r\nconst m = Math.floor(s / 60);\r\ns = s % 60;\r\n\r\nprintOutput(`${h}시 ${m}분 ${s}초`);","solution":"let s = parseInt(readline());\r\nconst h = Math.floor(s / 3600);\r\ns = s % 3600;\r\nconst m = Math.floor(s / 60);\r\ns = s % 60;\r\n\r\nprint(`${h}시 ${m}분 ${s}초`);"}
  loadedProblem(problem);
})();