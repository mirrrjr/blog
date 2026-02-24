<template>
  <div class="container-box">
    <p align="center">
      <img
        src="https://iili.io/dBau4ZN.gif)](https://freeimage.host/i/dBau4ZN"
        alt="banner"
      />
    </p>

    <p align="center">
      <samp>
        <!-- <a href="https://blog.mirrr.uz/">blog</a> . -->
        <a href="https://mirrr.uz/">portfolio</a> .
        <a href="https://www.linkedin.com/in/mirrrjr/">linkedin</a> .
        <a href="https://bsky.app/profile/mirrr.uz">bsky</a> .
        <a href="https://t.me/mirrrjr">telegram</a>
      </samp>
    </p>

    <div class="resume">
      <a
        href="/asset/MirsoliMirsultonovResume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        class="resume-btn view-btn"
      >
        View Resume
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
      <a
        href="/asset/MirsoliMirsultonovResume.pdf"
        download
        class="resume-btn download-btn"
        title="Download Resume"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16l-6-6h4V4h4v6h4l-6 6z"/><path d="M20 18H4v2h16v-2z"/></svg>
      </a>
    </div>

    <table align="center">
      <thead>
        <tr>
          <th>Language</th>
          <th>Backend</th>
          <th>DataBase</th>
          <th>Extra</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td align="center">
            <img class="skils" src="https://skillicons.dev/icons?i=typescript" />
            <img class="skils" src="https://skillicons.dev/icons?i=php" />
            <img class="skils" src="https://skillicons.dev/icons?i=rust" />
          </td>
          <td align="center">
            <img class="skils" src="https://skillicons.dev/icons?i=laravel" />
            <img class="skils" src="https://skillicons.dev/icons?i=nestjs" />
            <img class="skils" src="https://skillicons.dev/icons?i=actix" />
          </td>
          <td align="center">
            <img class="skils" src="https://skillicons.dev/icons?i=mongodb" />
            <img class="skils" src="https://skillicons.dev/icons?i=postgresql" />
            <img class="skils" src="https://skillicons.dev/icons?i=mysql" />
          </td>
          <td align="center">
            <img class="skils" src="https://skillicons.dev/icons?i=linux" />
            <img class="skils" src="https://skillicons.dev/icons?i=git" />
            <img class="skils" src="https://skillicons.dev/icons?i=nix" />
          </td>
        </tr>
      </tbody>
    </table>

    <p align="center">
      <a href="https://hits.sh/github.com/mirrrjr/">
        <img
          src="https://hits.sh/github.com/mirrrjr.svg?view=today-total&label=mirrr's%20viewers%20(today%20%2F%20total)&color=ff5a00&labelColor=0a0505"
        />
      </a>
    </p>

    <p align="center">
      <img
        src="https://iili.io/dBau4ZN.gif)](https://freeimage.host/i/dBau4ZN"
        alt="banner"
      />
    </p>
  </div>
</template>

<style>
.container-box {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

.links {
  display: flex;
  justify-content: center;
  align-items: center;
}

.links a {
  margin-right: 5px;
  margin-left: 5px;
}

.resume {
  display: flex;
  align-items: center;
}
.resume-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease, opacity 0.2s ease;
  letter-spacing: 0.02em;
}

.resume-btn:hover {
  transform: translateY(-2px);
  text-decoration: none;
}

/* View tugmasi — sahifadagi border/outlined stil bilan mos */
.view-btn {
  padding: 9px 18px;
  margin-right: 5px;
  background: transparent;
  color: var(--vp-c-text-1, #e0e0e0);
  border: 1px solid var(--vp-c-divider, #3a3a3a);
}

.view-btn:hover {
  background: var(--vp-c-bg-soft, #1e1e1e);
  border-color: var(--vp-c-text-2, #888);
  color: var(--vp-c-text-1, #e0e0e0);
}

/* Download tugmasi — yashil accent (sahifadagi yashil rangga mos) */
.download-btn {
  padding: 9px 13px;
  background: var(--vp-c-green-soft, rgba(16, 185, 129, 0.15));
  color: var(--vp-c-green-1, #10b981);
  border: 1px solid var(--vp-c-green-2, rgba(16, 185, 129, 0.3));
}

.download-btn:hover {
  background: var(--vp-c-green-soft, rgba(16, 185, 129, 0.25));
  border-color: var(--vp-c-green-1, #10b981);
  opacity: 1;
}

.table-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.table_img {
  margin-bottom: 5px;
}

table {
  margin: 0;
  display: table;
}

.skils {
  margin-top: 5px;
}
</style>
