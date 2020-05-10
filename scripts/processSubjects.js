const fs = require('fs-extra');
const path = require('path');
const _subjects = require('../src/lib/subjects.json');

const getSubjects = () => {
  return _subjects
    .map(s => Object.values(s)[0])
}

const getSubjectsImageUrls = () => {
  const subjects = getSubjects();
  const subjectsWithNoCharacters = subjects
    .filter(s => !s.data.characters);
  const subjectsWithImages = subjectsWithNoCharacters
    .filter(s => (s.data.character_images || []).length > 0)
    .map(s => ({ [s.id]: s.data.character_images.filter(s => s.content_type === 'image/svg+xml')[0]['url'] }))
  console.log(`🌕 ${subjectsWithNoCharacters.length} radicals without characters`);
  console.log(`🌕 ${subjectsWithImages.length} images extracted`);
  console.log('🌕 ', subjectsWithImages)
}

const getFreeLevelSubjectsForTheDemo = async () => {
  const subjects = getSubjects();

  const ids = [
    8762,
    8763,
    8761,
    7560,
    2504,
    2503,
    2502,
    453,
    455,
    444,
  ];

  const freeSubjects = subjects.filter(s => ids.indexOf(s.id) !== -1);
  
  const OUT = path.join(__dirname + '/../src/mock/freeSubjects.json');
  console.log('💾 Preparing...')
  await fs.remove(OUT);
  console.log('💾 Writing to file...')
  await fs.outputJson(OUT, freeSubjects)
}

// getSubjectsImageUrls();
getFreeLevelSubjectsForTheDemo();