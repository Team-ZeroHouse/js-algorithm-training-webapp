(function()
{
  const pack = {
    id: 'system',
    title: '시스템 익히기',
    levels: [
      {
        id: 'basic',
        title: '기본 익히기',
        descripiton: '시스템의 아주 기본적인 부분을 알아봅니다.',
        problems: [
          {
            id: 'what_is_algorithm_training',
            name: '알고리즘 훈련이란'
          }
        ]
      }
    ]
  };
  loadedProblemPack(pack);
})();