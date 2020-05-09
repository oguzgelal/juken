const _subjects = require('../src/lib/subjects.json');

const main = () => {

  const subjects = _subjects
    .map(s => Object.values(s)[0])
  
  const subjectsWithNoCharacters = subjects
    .filter(s => !s.data.characters);

  const subjectsWithImages = subjectsWithNoCharacters
    .filter(s => (s.data.character_images || []).length > 0)
    .map(s => ({ [s.id]: s.data.character_images.filter(s => s.content_type === 'image/svg+xml')[0]['url'] }))

  console.log(`🌕 ${subjectsWithNoCharacters.length} radicals without characters`);
  console.log(`🌕 ${subjectsWithImages.length} images extracted`);
  console.log('🌕 ', subjectsWithImages)

}

main();