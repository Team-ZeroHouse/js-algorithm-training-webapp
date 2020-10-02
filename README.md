# JS 알고리즘 트레이닝 웹앱

아주아주 간단하게 구성된 JS 알고리즘 트레이닝 웹앱입니다.

일반적으로 볼 수 있는 **알고리즘 트레이닝 사이트(웹저지)** 와 비슷한 구성을 가지고 있습니다. **표준입력(stdio)** 을 통해서 입력 받고 **표준출력(stdout)** 을 사용해 답을 출력합니다.

JavaScript에는 표준입출력 기능이 없습니다. 그렇기에 본 앱에서는 readline()과 print()를 함수를 제공합니다.

## 왜 이 프로젝트를 만들었는가?

처음 프로그래밍을 공부하는 사람에게 가장 필요한 것은 (변수, 조건분기, 반복, 함수)와 같은 프로그래밍 언어의 구성요소를 수 많은 문제를 풀면서 자연스럽게 프로그래밍적 사고가 기계적으로 나올 수 있게 만드는 것이라 생각합니다.

그러기 위해서는 정말 많은 알고리즘 문제를 풀어야 합니다. 그러나 기계적으로 수많은 문제를 풀 수 있는 JavaScript를 위한 알고리즘 트레이닝 사이트는 국내에 없습니다. JS는 태생적인 이유로 인해서 표준입출력이 지원되지 않기에 기존에 존재하는 알고리즘 사이트에서 일반적인 방법으로는 문제를 풀 수가 없습니다. 아주 기괴한 방법을 통해서 입력을 받아야만 합니다. readline 함수 하나만 넣어주면 좋겠는데 그렇지를 않습니다.

기괴한 방법을 본 초보자들은 그 코드를 이해할 수 없습니다. 이는 정말 끔찍한 일입니다.

'그냥 내가 만들자'는 생각을 했고 그대로 실천에 옮겼습니다. 예전부터 한 생각이지만 이제서야 만들어 냈습니다. '우선 빠르게 만들어만 보자'라고 생각하며 만들었기에 코드에 안티패턴이 많이 사용되었습니다. 추후에 많은 수정을 통해서 개선해 나갈 예정입니다.

## 실행하기 위해서 필요한 것

Chrome만 있으면 됩니다. 별도의 추가 설치가 필요 없습니다.

## 용어설명

- **문제(problem)**: 코드를 이용해서 해결해야하는 하나의 문제입니다.
- **레벨(level)**: 같은 개념 또는 난이도를 공유하는 문제들의 묶음입니다.
- **문제 팩(problem pack)**: 추가로 설치가능한 문제 레벨의 묶음입니다. 특별한 목적을 가진 문제들을 분류하기 위해서 사용됩니다.

## 실행 방법

1. index.html을 Chrome으로 실행하세요. **문제 팩들** 항목에서 풀고자 하는 팩을 선택하세요.
2. **문제 팩에 있는 문제들** 항목에 문제 목록이 나타납니다. 원하는 문제를 선택하면 solve.html을 통해서 문제를 풀 수 있는 화면이 나타납니다.
3. 설명을 읽고 답에 해당하는 코드를 작성후 **테스트 케이스(Test Case)** 로 우선 확인해 본 후 **최종 채점**을 통해서 정답인지 아닌지 확인할 수 있습니다. 현재는 문제에 보이는 테스트케이스만을 통해서 정답을 확인하지만 추후 문제에 보이지 않는 테스트 케이스 또한 맞춰야만 정답으로 인정되도록 수정할 계획입니다.

## 표준입출력(stdio)

- readline(void) 함수를 통해서 한줄 입력을 받을 수 있습니다. 만약 입력이 존재하지 않으면 빈문자열('')이 반환됩니다.
- print(arg: string) 함수를 통해서 출력할 수 있습니다. 출력에는 개행(\n)이 포함됩니다.

## 어떻게 코드가 동작합니까?

new Function()을 통해서 코드를 감싸고 실행시킵니다. 입력한 코드에서 readline은 arguments[0]로 print는 arguments[1]로 변환시킵니다. 그리고 new Function(code)를 통해서 생성된 func객체를 func.apply(null, [readline, print])를 통해서 호출시킵니다. 이와 같은 방법으로 존재하지 않는 readline과 print를 코드에서 실행 시킬 수 있습니다.


## 문제를 추가하는 방법

maker.html을 열어서 문제를 만들 수 있습니다.

- 직렬화된 문제를 입력하는 란
- 문제를 작성하는 란
- 문제를 직렬화하여 출력하는 란

으로 구성됩니다.

문제는 '제목', '설명', '테스트케이스', '정답코드'로 구성됩니다.

프로젝트 디렉터리에 있는 **problems-packs** 디렉터리에 packs.js를 통해서 현재 앱에 설치된 **문제 팩**을 확인할 수 있습니다. **problemPacks** 변수에 문제 팩 객체(ProblemPackListItem) 배열이 할당됩니다.

``` typescript
interface ProblemPackListItem
{
  id: string // 문제 팩이 있는 디렉터리 명과 동일해야함
  title: string // 앱에 표시되는 문제 팩 이름
}
```

problems-pack 디렉터리의 하위 디렉터리는 **문제 팩**입니다. 이 문제 팩 디렉터리에는 **pack.js**와 **레벨**디렉터리가 존재합니다. pack.js에는 **pack** 변수가 있고 여기에는 문제 팩 상세 정보(ProblemPack)가 할당됩니다.

``` typescript
interface ProblemPack
{
  id: string // 위 서술과 동일
  title: string // 위 서술과 동일
  levels: Level[] // 문제 팩에 포함되는 레벨 목록
}

interface Level
{
  id: string // 레벨 디렉터리 명과 동일해야함
  title: string // 앱에 표시되는 레벨 명
  description: string // 앱에 표시되는 레벨 설명
  problems: ProblemListItem[] // 레벨에 포함되는 문제 목록
}

interface ProblemListItem
{
  id: string // 레벨 디렉터리 내 존재하는 문제 파일과 이름이 동일해야함
  name: string // 앱에 표시되는 문제 이름
}
```

레벨 디렉터리 내에는 문제 파일들이 존재합니다. 만약 문제의 id가 'a_plus_b'라면 문제 파일명은 'a_plus_b.js' 여야만합니다. 이 파일에는 **problem** 변수가 있고 여기에는 문제 객체(Problem)가 할달됩니다.

``` typescript
interface Problem
{
  title: string // 문제의 제목
  content: string // 문제를 설명하는 markdown
  openTestCases: TestCase[] // 문제의 오플 테스트 케이스 목록
  randomTestCase: string // 랜덤 테스트 케이스를 만드는 코드
  solution: string // 제공되는 문제의 정답
}

interface TestCase
{
  input: string // 표준입력으로 제공된 것들
  output: string // 테스트 케이스의 정답
}
```

Problem 객체의 randomTestCase을 통해서 openTestCases에 일일히 테스트 케이스를 만들어 넣을 필요 없이 랜덤한 테스트를 만들 수 있다. 이를 위해서 아래와 같은 두개의 함수를 제공한다.

``` typescript
printInput(line: string): void
printOutput(line: string): void
```

printInput은 테스트 케이스의 입력부에 한줄을 추가하고 printOutput은 테스트 케이스의 출력부에 한줄을 추가한다.

## 사용한 라이브러리

- [jQuery v3.5.1](https://jquery.com/)
- [Monaco Editor v0.20.0](https://microsoft.github.io/monaco-editor/)
- [Toast Editor v2.4.0](https://ui.toast.com/tui-editor/)

## 앞으로 진행될 사항들

- 문제 계속 추가
- 디자인 변화
- React로 리팩토링
- 푼 문제 표시 및 코드 저장