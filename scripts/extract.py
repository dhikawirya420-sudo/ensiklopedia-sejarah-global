"""Convert the supplied PDF faithfully; run with Python + pypdf."""
import json, re, shutil, sys
from pathlib import Path
from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1])
pages = [' '.join(p.extract_text().split()) for p in PdfReader(source).pages]
text = ' '.join(pages)
def between(a, b): return text.split(a, 1)[1].split(b, 1)[0].strip()
def sections(body, headings):
    if not headings: return [{'title': '', 'text': body}]
    result = []
    for i, title in enumerate(headings):
        start = body.index(title) + len(title)
        end = body.index(headings[i+1], start) if i+1 < len(headings) else len(body)
        result.append({'title': title, 'text': body[start:end].strip()})
    return result

eras = ['Dunia Klasik dan Transformasinya', 'Jaringan Agama, Perdagangan, dan Ilmu', 'Komersialisasi, Universitas, dan Imperium Eurasia', 'Dunia Samudra dan Revolusi Pengetahuan', 'Industri, Imperium, dan Sains Profesional', 'Abad Dunia Modern']
titles = ['Dunia kerajaan & jaringan dagang', 'Kertas, kota & konektivitas', 'Krisis dan kesinambungan', 'Agama & institusi pembelajaran', 'Transformasi dunia klasik', 'Hukum & jaringan keagamaan', 'Islam, Tang & Srivijaya', 'Baghdad & pertukaran gagasan', 'Aljabar & dunia percetakan', 'Song & Samudra Hindia', 'Pasar, kota & universitas', 'Pengetahuan lintas bahasa', 'Mongol & jaringan Eurasia', 'Wabah, perdagangan & Majapahit', 'Samudra & revolusi cetak', 'Pertukaran dunia samudra', 'Perdagangan & revolusi sains', 'Revolusi & awal industri', 'Uap, listrik & imperium', 'Perang, kemerdekaan & komputer', 'Dunia digital & kecerdasan buatan']
matches = list(re.finditer(r'Abad (\d+) \(([^)]+)\)', text))
assert len(matches) == 21
index_text = between('Bagian IX — Indeks Abad untuk Pengembangan Lanjutan', 'Glosarium Ringkas')
index = re.findall(r'Abad (\d+) — (.*?)(?= Abad \d+ — |$)', index_text)
chapters = []
for i, m in enumerate(matches):
    end = matches[i+1].start() if i < 20 else text.index('Bagian VII —')
    body = text[m.end():end].split('Bagian ')[0].strip()
    heads = []
    if i == 0: heads = ['Snapshot Dunia', 'Kehidupan Masyarakat', 'Ekonomi, Negara, dan Militer', 'Pengetahuan dan Teknologi', 'Transmisi Pengetahuan', 'Asia Tenggara dan Nusantara', 'Warisan ke Masa Kini', 'Miskonsepsi']
    if i == 18: heads = ['Kehidupan Masyarakat', 'Ekonomi dan Militer', 'Ilmu dan Penemuan', 'Nusantara', 'Warisan ke Masa Kini']
    if i == 20: heads = ['Kehidupan Masyarakat', 'Ekonomi dan Geopolitik', 'Ilmu dan Teknologi', 'Miskonsepsi']
    era = 0 if i < 5 else 1 if i < 10 else 2 if i < 15 else 3 if i < 18 else 4 if i == 18 else 5
    page = 1 + sum(m.start() >= len(' '.join(pages[:p])) + 1 for p in range(1, len(pages)))
    chapters.append({'id': f'abad-{i+1}', 'century': i+1, 'title': titles[i], 'years': m[2], 'era': era, 'page': page, 'index': index[i][1], 'sections': sections(body, heads)})

science_heads = ['Matematika', 'Astronomi', 'Kedokteran', 'Fisika', 'Kimia', 'Biologi', 'Komputer dan AI', 'Ekonomi dan Keuangan', 'Hukum dan Pemerintahan']
synthesis_heads = ['Pergeseran Pusat Ekonomi', 'Evolusi Perang', 'Evolusi Komunikasi', 'Institusi yang Bertahan', 'Kontinuitas dan Rupture']
glossary_heads = ['Afro-Eurasia', 'Birokrasi', 'Civil law', 'Common law', 'Great Divergence', 'Indianisasi', 'Industrial Revolution', 'Jalur Sutra', 'Scientific Revolution', 'Transmisi pengetahuan']
data = {'title': 'Ensiklopedia Sejarah Global', 'eras': eras, 'chapters': chapters,
    'about': between('Tentang Ensiklopedia Ini', 'Cara Membaca'),
    'guide': between('Cara Membaca', 'Peta Besar 2.000 Tahun'),
    'overview': between('Peta Besar 2.000 Tahun', 'Bagian I —'),
    'sciences': sections(between('Bagian VII — Genealogi Ilmu Modern', 'Bagian VIII —'), science_heads),
    'synthesis': sections(between('Bagian VIII — Sintesis 2.000 Tahun', 'Bagian IX —'), synthesis_heads),
    'glossary': sections(between('Glosarium Ringkas', 'Catatan Editorial dan Sumber'), [h+' —' for h in glossary_heads]),
    'editorial': text.split('Catatan Editorial dan Sumber', 1)[1].strip()}
for g in data['glossary']: g['title'] = g['title'].removesuffix(' —')
(root/'assets/content.js').write_text('export const encyclopedia = '+json.dumps(data, ensure_ascii=False, indent=2)+';\n')
shutil.copyfile(source, root/'assets/ensiklopedia-sejarah-global.pdf')
assert len(data['sciences']) == 9 and len(data['glossary']) == 10
assert all(s['text'] for c in chapters for s in c['sections'])
print(f'Extracted {len(pages)} pages, 21 chapters, 9 sciences, 5 synthesis topics, 10 glossary entries.')
