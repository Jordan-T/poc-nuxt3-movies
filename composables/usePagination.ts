export function usePagination() {
  const route = useRoute();
  const page = ref(route.query.page ? Number(route.query.page) : 1);

  watch(page, (value) => {
    const router = useRouter();
    router.push({
      path: route.path,
      query: { page: value === 1 ? undefined : value },
    });
  });

  watch(
    () => route.query.page,
    (value) => {
      if (value) {
        page.value = Number(value);
      } else {
        page.value = 1;
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  );

  return {
    page,
  };
}
