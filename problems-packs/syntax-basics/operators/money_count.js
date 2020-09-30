(function()
{
  const problem = {"title":"지폐의 수","content":"과일의 개당 가격이 아래와 같다.\n\n- 사과: 3000원\n- 포도: 2000원\n- 키위: 1000원\n\n총 가격에 맞는 지폐의 수를 출력하는 것이 문제이다.\n\n만약 사과 3개, 포도 5개, 키위 2개를 사면 총 가격이 9000 + 10000 + 1000 = 21000원이 된다.\n10000원, 5000원, 1000원 지폐가 최소의 수로 각각 몇장이 필요한가?\n20300원의 경우 10000원 2장, 5000원 0장, 1000원 1장이 필요하다.\n\n### 입력\n첫번째 줄: 사과의 갯수\n두번째 줄: 포도의 갯수\n세번째 줄: 키위의 갯수\n\n### 출력\n첫번째 줄: 10000원 지폐의 수\n두번째 줄: 5000원 지폐의 수\n세번째 줄: 1000원 지폐의 수","openTestCases":[{"input":"3\n5\n1","output":"2\n0\n0"},{"input":"134\n4\n55","output":"46\n1\n0"},{"input":"0\n0\n9","output":"0\n1\n4"}],"randomTestCase":"const apple = Math.floor(Math.random() * 200);\r\nconst grape = Math.floor(Math.random() * 200);\r\nconst kiwi = Math.floor(Math.random() * 200);\r\n\r\nprintInput(apple);\r\nprintInput(grape);\r\nprintInput(kiwi);\r\n\r\nconst totalPrice = apple * 3000 + grape * 2000 + kiwi * 1000;\r\n\r\nlet money = totalPrice;\r\nconst money10000 = Math.floor(money / 10000);\r\nmoney -= money10000 * 10000;\r\nconst money5000 = Math.floor(money / 5000);\r\nmoney -= money5000 * 5000;\r\nlet money1000 = Math.floor(money / 1000);\r\n\r\nprintOutput(money10000);\r\nprintOutput(money5000);\r\nprintOutput(money1000);","solution":"const apple = parseInt(readline());\r\nconst grape = parseInt(readline());\r\nconst kiwi = parseInt(readline());\r\n\r\nconst totalPrice = apple * 3000 + grape * 2000 + kiwi * 1000;\r\n\r\nlet money = totalPrice;\r\nconst money10000 = Math.floor(money / 10000);\r\nmoney -= money10000 * 10000;\r\nconst money5000 = Math.floor(money / 5000);\r\nmoney -= money5000 * 5000;\r\nlet money1000 = Math.floor(money / 1000);\r\n\r\nprint(money10000);\r\nprint(money5000);\r\nprint(money1000);"}
  loadedProblem(problem);
})();