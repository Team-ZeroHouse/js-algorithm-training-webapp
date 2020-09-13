(function()
{
  const pack = {
    id: 'syntax-basics',
    title: '기본 문법 훈련',
    levels: [
      {
        title: '기본 연산자',
        level: 'operators',
        descripiton: '기본적인 입력과 출력을 훈련합니다.',
        problems: [
          {
            id: 'a_plus_b',
            name: 'A + B'
          },
          {
            id: 'a_minus_b',
            name: 'A - B'
          }
        ]
      }
    ]
  };
  loadedProblemPack(pack);
})();