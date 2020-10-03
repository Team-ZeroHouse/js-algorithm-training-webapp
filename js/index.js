window.loadedProblemPakcs = undefined;
window.loadedProblemPack = undefined;

(function()
{
  window.loadedProblemPakcs = function(packs)
  {
    packs.forEach(pack =>
    {
      const s = document.createElement('script');
      s.src = `problems-packs/${pack.id}/pack.js`;
      document.body.appendChild(s);

      const $li = $(`
        <li class="problem-pack" data-pack-id="${pack.id}">
          <a class="header" href="#${pack.id}">${pack.title}</a>
          <ol class="levels"></ol>
        </li>
      `);
      $('#problems-packs').append($li);
    });
  }

  window.loadedProblemPack = function(pack)
  {
    const $levels = $(`li[data-pack-id=${pack.id}] ol`);
    pack.levels.forEach((level, levelIndex) =>
    {
      const $li = $(`
        <li class="level" data-level-id="${level.id}">
          <header>
            <h3 class="title">${levelIndex + 1}. ${level.title}</h3>
            <p class="description">${level.description}</p>
          </header>

          <ol class="problems"></ol>
        </li>
      `);
      $levels.append($li);

      const $problems = $li.find('ol.problems');
      for (const problem of level.problems)
      {
        const link = `solve.html?pack=${pack.id}&level=${level.id}&problem=${problem.id}`;
        const $li = $(`
          <li class="problem">
            <a href="${link}">${problem.name}</a>
          </li>
        `);
        $problems.append($li);
      }
    });
  }
})();