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

    const fetchJoke = async () => {
      try {
        loading.value = true;
        const response = await fetch(
          "https://v2.jokeapi.dev/joke/Programming,Dark?blacklistFlags=religious,sexist&type=twopart",
        );
        const data: Joke = await response.json();

        if (data.error) {
          error.value = "Joke not found";
        } else {
          joke.value = data;
        }
      } catch (err) {
        error.value = "An error occurred";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchJoke();
    });

    return {
      joke,
      loading,
      error,
      fetchJoke,
    };
  },
});
</script>

<template>
  <div class="secret-block">
    <div class="joke-container">
      <div v-if="loading" class="loading">Loading...</div>

      <div v-else-if="error" class="error">{{ error }}</div>

      <div v-else-if="joke" class="joke">
        <p class="setup">{{ joke.setup }}</p>
        <p class="delivery">{{ joke.delivery }}</p>
      </div>
      <img
        class="secret-img"
        src="https://ext.fmkorea.com/files/attach/new3/20230911/4330602/5523737409/6172196892/e0d5923c76c97ae497b933f4bb491707.png"
        alt="Fuck you"
      />
    </div>
  </div>
</template>

<style>
.secret-block {
  min-height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 30px;
}

.secret-img {
  width: 500px;
  height: auto;
  max-width: 100%;
}

.joke-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.joke {
  text-align: center;
  margin-bottom: 20px;
}

.setup {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.delivery {
  font-size: 16px;
  color: #666;
  font-style: italic;
  margin-bottom: 20px;
}

.single-joke {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}

.loading,
.error {
  text-align: center;
  font-size: 16px;
  color: #666;
}

.error {
  color: #d32f2f;
}

.refresh-btn {
  padding: 10px 20px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.refresh-btn:hover {
  background: #1976d2;
}
</style>
