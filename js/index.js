const packs = {};

function loadedProblemPakcs(packs)
{
  packs.forEach(pack =>
  {
    packs[pack.id] = null;
    const s = document.createElement('script');
    s.src = `problems-packs/${pack.id}/pack.js`;
    document.body.appendChild(s);

    const $li = $('<li />');
    const $a = $('<a />');
    $a.attr('href', `#${pack.id}`);
    $a.text(pack.title);
    $li.append($a);
    $('#packs').append($li);
  });
}

function loadedProblemPack(pack)
{
  packs[pack.id] = pack;
  changePack();
}

function changePack()
{
  const packId = location.hash.replace(/^#/, '');
  if (packId.length === 0)
  {
    $('#levels').html('');
    return;
  }

  if (packId in packs)
  {
    $('#levels').html('');
    
    packs[packId].levels.forEach(function(level)
    {
      const $levelLi = $(`<li><h3>${level.title}</h3><p>${level.descripiton}</p></li>`);
      const $levels = $('<ol>');
      $levelLi.append($levels);
      level.problems.forEach(function(problem)
      {
        const $problem = $(`<li><a href="solve.html?pack=${packId}&level=${level.id}&problem=${problem.id}">${problem.name}</a></li>`);
        $levels.append($problem);
      });
      
      $('#levels').append($levelLi);
    });
  }
}

$(window).on('hashchange', changePack);