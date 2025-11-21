# ToBe Creative - Portfolio Website

Modern ve animasyonlu portfolyo sitesi. Next.js, Tailwind CSS ve Framer Motion kullanılarak geliştirilmiştir.

## Özellikler

### Animasyonlar
- **Yükleme Animasyonu**: Site açılışında siyah arka plan üzerinde loading bar
- **Arka Plan Geçişi**: Soldan sağa fade efekti ile gradient arka plan
- **Logo Animasyonu**: Merkeze fade-in ve scale efekti ile logo görünümü
- **Navigasyon**: Sol ve sağ üst köşelerde fade-in ile beliren menüler
- **İçerik Geçişleri**: Sekmeler arası fade-out/fade-in geçişleri
- **Yazı Makinesi**: About ve Contact sayfalarında karakter karakter yazı animasyonu

### Sayfalar
- **Ana Sayfa (Home)**: 6 resimlik responsive grid galeri
- **Animation/Graphic/UX-UI**: Her sekme aynı galeri içeriğini gösterir
- **About**: Şirket hakkında bilgi (yazı makinesi efekti ile)
- **Contact**: İletişim bilgileri (yazı makinesi efekti ile)

### Responsive Tasarım
- Mobil, tablet ve desktop için optimize edilmiş
- Esnek grid sistemi
- Responsive navigasyon menüleri

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development sunucusunu başlat
npm run dev

# Production build
npm run build

# Production sunucusunu başlat
npm start
```

## Teknolojiler

- **Next.js 15**: React framework
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animasyon kütüphanesi
- **Baloo 2 Font**: Özel font ailesi

## Proje Yapısı

```
├── app/
│   ├── layout.tsx          # Ana layout ve font tanımlamaları
│   ├── page.tsx            # Ana sayfa ve state yönetimi
│   └── globals.css         # Global stiller
├── components/
│   ├── Loader.tsx          # Yükleme animasyonu
│   ├── Gallery.tsx         # Resim galerisi
│   └── TypingText.tsx      # Yazı makinesi animasyonu
├── lib/
│   └── content.ts          # About ve Contact içerikleri
└── public/
    └── assets/             # Resimler ve fontlar
```

## Geliştirme Notları

- Tüm animasyonlar toplam 3-4 saniye içinde tamamlanır
- Asset preloading ile hızlı yükleme sağlanır
- Responsive tasarım için Tailwind breakpoint'leri kullanılır
- Framer Motion ile performanslı animasyonlar

## Lisans

Özel proje - ToBe Creative

