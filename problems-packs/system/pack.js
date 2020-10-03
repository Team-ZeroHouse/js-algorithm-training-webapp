(function()
{
  const pack = {
    id: 'system',
    title: '시스템 익히기',
    levels: [
      {
        id: 'basic',
        title: '기본 익히기',
        description: '시스템의 아주 기본적인 부분을 알아봅니다.',
        problems: [
          {
            id: 'what_is_algorithm_training',
            name: '알고리즘 훈련이란'
          },
          {
            id: 'one_line_input_multiple_values',
            name: '한줄로 여러 값 입력받기'
          },
          {
            id: 'dont_doubt_the_input',
            name: '입력을 의심하지 마세요.'
          }
        ]
      }
    ]
  };
  loadedProblemPack(pack);
})();