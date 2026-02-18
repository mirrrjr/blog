<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

interface Joke {
  error: boolean;
  category: string;
  type: string;
  setup?: string;
  delivery?: string;
  joke?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

export default defineComponent({
  name: "Secret",
  setup() {
    const joke = ref<Joke | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const revealed = ref(false);

    const fetchJoke = async () => {
      revealed.value = false;
      try {
        loading.value = true;
        error.value = null;
        const response = await fetch(
          "https://v2.jokeapi.dev/joke/Programming,Dark?blacklistFlags=religious,sexist&type=twopart"
        );
        const data: Joke = await response.json();
        if (data.error) {
          error.value = "Joke not found";
        } else {
          joke.value = data;
          setTimeout(() => (revealed.value = true), 300);
        }
      } catch (err) {
        error.value = "An error occurred";
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchJoke();
    });

    return { joke, loading, error, fetchJoke, revealed };
  },
});
</script>

<template>
  <div class="secret-block">
    <div class="scanlines"></div>
    <div class="noise"></div>

    <div class="terminal-header">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span class="terminal-title">secret.exe — bash</span>
    </div>

    <div class="joke-container" :class="{ revealed }">
      <div class="category-badge" v-if="joke">
        <span class="blink">▶</span> {{ joke.category.toUpperCase() }}
      </div>

      <div v-if="loading" class="loading">
        <span class="cursor-blink">_</span> Fetching dark secrets...
      </div>

      <div v-else-if="error" class="error">
        <span class="err-icon">⚠</span> {{ error }}
      </div>

      <div v-else-if="joke" class="joke">
        <p class="setup">{{ joke.setup }}</p>
        <div class="divider"><span>▼</span></div>
        <p class="delivery">{{ joke.delivery }}</p>
      </div>

      <button class="refresh-btn" @click="fetchJoke" :disabled="loading">
        <span class="btn-icon">⟳</span>
        <span>{{ loading ? "Loading..." : "Next Joke" }}</span>
      </button>
    </div>

    <div class="img-frame">
      <div class="corner tl"></div>
      <div class="corner tr"></div>
      <div class="corner bl"></div>
      <div class="corner br"></div>
      <img
        class="secret-img"
        src="https://ext.fmkorea.com/files/attach/new3/20230911/4330602/5523737409/6172196892/e0d5923c76c97ae497b933f4bb491707.png"
        alt="Secret"
      />
      <div class="img-label">[ classified ]</div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700&display=swap');

.secret-block {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 40px 20px;
  background: #060810;
  overflow: hidden;
  font-family: 'Share Tech Mono', monospace;
}

/* Scanlines overlay */
.scanlines {
  pointer-events: none;
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 150, 0.015) 2px,
    rgba(0, 255, 150, 0.015) 4px
  );
  z-index: 100;
}

/* Noise texture */
.noise {
  pointer-events: none;
  position: fixed;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  z-index: 99;
}

/* Glow background */
.secret-block::before {
  content: '';
  position: fixed;
  width: 600px;
  height: 600px;
  background: radial-gradient(ellipse, rgba(0, 255, 120, 0.06) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* Terminal header */
.terminal-header {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #111820;
  border: 1px solid #1e3a2a;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  padding: 10px 18px;
  width: 100%;
  max-width: 600px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot.red    { background: #ff5f57; box-shadow: 0 0 6px #ff5f5788; }
.dot.yellow { background: #febc2e; box-shadow: 0 0 6px #febc2e88; }
.dot.green  { background: #28c840; box-shadow: 0 0 6px #28c84088; }

.terminal-title {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #4a7a5a;
  letter-spacing: 2px;
}

/* Main card */
.joke-container {
  width: 100%;
  max-width: 600px;
  background: #0c1218;
  border: 1px solid #1e3a2a;
  border-radius: 0 0 12px 12px;
  padding: 32px 36px;
  position: relative;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  box-shadow:
    0 0 40px rgba(0, 255, 120, 0.05),
    inset 0 1px 0 rgba(0, 255, 120, 0.07);
}

.joke-container.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Category badge */
.category-badge {
  font-size: 11px;
  letter-spacing: 3px;
  color: #00ff78;
  margin-bottom: 24px;
  text-shadow: 0 0 10px #00ff7888;
}

.blink {
  animation: blink 1.2s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Joke text */
.joke {
  text-align: center;
  margin-bottom: 28px;
}

.setup {
  font-size: 17px;
  color: #d4f5e2;
  line-height: 1.7;
  margin-bottom: 20px;
  text-shadow: 0 0 20px rgba(0, 255, 120, 0.15);
}

.divider {
  color: #00ff7844;
  font-size: 14px;
  margin-bottom: 16px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.delivery {
  font-size: 15px;
  color: #7ecf9e;
  font-style: italic;
  line-height: 1.7;
  border-left: 2px solid #00ff7844;
  padding-left: 16px;
  text-align: left;
}

/* Loading & Error */
.loading, .error {
  text-align: center;
  font-size: 14px;
  color: #4a8a6a;
  letter-spacing: 1px;
  padding: 24px 0;
}

.cursor-blink {
  animation: blink 0.8s step-end infinite;
  color: #00ff78;
}

.error {
  color: #ff6b6b;
  text-shadow: 0 0 10px #ff6b6b44;
}

.err-icon {
  margin-right: 8px;
}

/* Button */
.refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  background: transparent;
  border: 1px solid #00ff7833;
  border-radius: 6px;
  color: #00ff78;
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.refresh-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 120, 0.06), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.refresh-btn:hover::before {
  transform: translateX(100%);
}

.refresh-btn:hover {
  border-color: #00ff78;
  background: rgba(0, 255, 120, 0.05);
  box-shadow: 0 0 20px rgba(0, 255, 120, 0.15);
  text-shadow: 0 0 10px #00ff7899;
}

.refresh-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 16px;
  display: inline-block;
  transition: transform 0.4s ease;
}

.refresh-btn:hover .btn-icon {
  transform: rotate(180deg);
}

/* Image section */
.img-frame {
  position: relative;
  display: inline-block;
  padding: 12px;
}

.img-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 255, 120, 0.03);
  border-radius: 8px;
}

.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: #00ff78;
  border-style: solid;
  opacity: 0.6;
}
.corner.tl { top: 0; left: 0; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
.corner.tr { top: 0; right: 0; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
.corner.bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
.corner.br { bottom: 0; right: 0; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

.secret-img {
  width: 500px;
  height: auto;
  max-width: 100%;
  display: block;
  filter: saturate(0.8) contrast(1.1);
  border-radius: 4px;
  transition: filter 0.3s ease;
}

.secret-img:hover {
  filter: saturate(1.1) contrast(1.15) drop-shadow(0 0 20px rgba(0, 255, 120, 0.2));
}

.img-label {
  text-align: center;
  font-size: 10px;
  letter-spacing: 4px;
  color: #2a6a4a;
  margin-top: 10px;
  text-transform: uppercase;
}
</style>