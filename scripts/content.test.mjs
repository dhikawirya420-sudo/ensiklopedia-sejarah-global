import test from 'node:test';
import assert from 'node:assert/strict';
import { encyclopedia as data } from '../assets/content.js';
import { readFile } from 'node:fs/promises';
test('All 21 source centuries are present and ordered',()=>{
  assert.deepEqual(data.chapters.map(c=>c.century),Array.from({length:21},(_,i)=>i+1));
  assert.equal(new Set(data.chapters.map(c=>c.id)).size,21);
  for(const c of data.chapters){assert.ok(c.page>=1&&c.page<=14);assert.ok(c.sections.every(s=>s.text.length>30));assert.ok(c.index.length>10);}
});
test('Preserves supplementary sections and source caveats',()=>{
  assert.equal(data.sciences.length,9);assert.equal(data.synthesis.length,5);assert.equal(data.glossary.length,10);
  assert.match(data.editorial,/kerangka ensiklopedis/);assert.match(data.editorial,/sitasi akademik/);
  assert.match(data.chapters[13].sections[0].text,/Majapahit/);
  assert.match(data.chapters[18].sections.find(s=>s.title==='Nusantara').text,/Lombok.*1894/);
  assert.equal(data.chapters[20].years,'2001–2026');
});
test('Static assets support GitHub project subpaths',async()=>{
  const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
  assert.doesNotMatch(html,/(?:src|href)="\//);
  const pdf=await readFile(new URL('../assets/ensiklopedia-sejarah-global.pdf',import.meta.url));
  assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
});
