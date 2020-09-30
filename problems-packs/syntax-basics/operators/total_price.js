(function()
{
  const problem = {"title":"총 가격","content":"과일의 개당 가격이 아래와 같다.\n\n- 사과: 3000원\n- 포도: 2000원\n- 키위: 1500원\n\n각 과일을 몇개를 사야하는지 입력 받고 총 가격을 출력하라.\n\n### 입력\n첫번째 줄: **사과의 갯수**\n두번째 줄: **포도의 갯수**\n세번째 줄: **키위의 갯수**\n\n### 출력\n총 금액을 출력하라.","openTestCases":[{"input":"1\n3\n2","output":"12000"},{"input":"4\n2\n6","output":"25000"},{"input":"0\n0\n0","output":"0"}],"randomTestCase":"const apple = Math.floor(Math.random() * 100);\r\nconst grape = Math.floor(Math.random() * 100);\r\nconst kiwi = Math.floor(Math.random() * 100);\r\nconst totalPrice = apple * 3000 + grape * 2000 + kiwi * 1500;\r\n\r\nprintInput(apple);\r\nprintInput(grape);\r\nprintInput(kiwi);\r\nprintOutput(totalPrice);","solution":"const apple = parseInt(readline());\r\nconst grape = parseInt(readline());\r\nconst kiwi = parseInt(readline());\r\n\r\nconst totalPrice = apple * 3000 + grape * 2000 + kiwi * 1500;\r\n\r\nprint(totalPrice);"}
  loadedProblem(problem);
})();