<script setup lang="ts">
const route = useRoute();
const page = ref(Number(route.query.page) ? Number(route.query.page) : 1);
const pageSize = 100;

const orderOptions = [
  {
    name: "Order by last trophy",
    value: "lastTrophyEarnedAt",
  },
  {
    name: "Order by first trophy",
    value: "firstTrophyEarnedAt",
  },
  {
    name: "Order by quality",
    value: "quality",
  },
  {
    name: "Order by progress",
    value: "progress",
  },
  {
    name: "Order by points",
    value: "points",
  },
  {
    name: "Order by stream points",
    value: "streamPoints",
  },
  {
    name: "Order by time streamed",
    value: "timeStreamed",
  },
];

const directionOptions = [
  {
    name: "Descending",
    value: "desc",
  },
  {
    name: "Ascending",
    value: "asc",
  },
];

const orderBy = ref("lastTrophyEarnedAt");
const direction = ref("desc");

const { data: projects } = await useFetch(
  `/api/public/v1/profiles/${route.params.hunter}/projects`,
  {
    query: { orderBy, direction, page, pageSize },
    transform: (projects) => {
      return {
        data: projects.data.map((project) => ({
          gameId: project.stack.game.id,
          stackId: project.stack.id,
          name: project.stack.game.name,
          platforms: project.stack.game.platforms,
          definedPlatinum: project.stack.definedPlatinum,
          definedGold: project.stack.definedGold,
          definedSilver: project.stack.definedSilver,
          definedBronze: project.stack.definedBronze,
          earnedPlatinum: project.earnedPlatinum,
          earnedGold: project.earnedGold,
          earnedSilver: project.earnedSilver,
          earnedBronze: project.earnedBronze,
          streamPlatinum: project.streamPlatinum,
          streamGold: project.streamGold,
          streamSilver: project.streamSilver,
          streamBronze: project.streamBronze,
          firstTrophyEarnedAt: project.firstTrophyEarnedAt,
          lastTrophyEarnedAt: project.lastTrophyEarnedAt,
          quality: project.stack.quality,
          progress: project.progress,
          points: project.points,
          streamPoints: project.streamPoints,
          timeStreamed: project.timeStreamed,
        })),
        page: projects.page,
        pageSize: projects.pageSize,
        totalSize: projects.totalSize,
      };
    },
  },
);
</script>

<template>
  <div id="top">
    <div class="mb-6 grid grid-cols-2 gap-6">
      <USelect
        v-model="orderBy"
        :options="orderOptions"
        option-attribute="name"
      >
        <template #trailing>
          <UIcon name="i-heroicons-arrows-up-down-20-solid" class="h-5 w-5" />
        </template>
      </USelect>

      <USelect
        v-model="direction"
        :options="directionOptions"
        option-attribute="name"
      >
        <template #trailing>
          <UIcon name="i-heroicons-arrows-up-down-20-solid" class="h-5 w-5" />
        </template>
      </USelect>
    </div>

    <div
      v-for="project in projects?.data"
      :key="project.stackId"
      class="mb-3 last:mb-0"
    >
      <HuntersHunterProjectOverview :project />
    </div>

    <div
      v-if="projects && projects.totalSize > projects.pageSize"
      class="mt-6 flex justify-center"
    >
      <UPagination
        v-model="page"
        :page-count="projects.pageSize"
        :total="projects.totalSize"
        :to="
          (page: number) => ({
            query: { page },
            hash: '#top',
          })
        "
        show-first
        show-last
      />
    </div>
  </div>
</template>
