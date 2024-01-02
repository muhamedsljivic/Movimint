import HomePage from "../components/app/HomePage";

export default function HomePageRoute() {
  // const { movies, totalPosts, postsPerPage } = useLoaderData();

  // const [searchParams, setSearchParams] = useSearchParams();
  // const [currentPage, setCurrentPage] = useState(
  //   parseInt(searchParams.get("page")) || 1
  // );
  // const [search, setSearch] = useState("");
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(false);
  // }, [movies]);

  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  //   setLoading(true);
  //   setSearchParams({ page: pageNumber });
  // };

  // const handleSearchChange = (newSearch) => {
  //   setSearch(newSearch);
  //   setLoading(true);
  //   setSearchParams({ search: newSearch, page: 1 });
  //   setCurrentPage(1);
  // };

  return <HomePage />;
}

// export async function loader({ request }) {
//   const url = new URL(request.url);
//   const currentPage = parseInt(url.searchParams.get("page"), 10) || 1;
//   const postsPerPage = 28;
//   const searchParams = url.searchParams;

//   const searchTerm = searchParams.get("search") || "";
//   const token = getAuthToken();
//   const response = await axios.get(
//     `http://localhost:3000/api/v1/movies?limit=${postsPerPage}&skip=${
//       (currentPage - 1) * postsPerPage
//     }&search=${searchTerm}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   if (response.status !== 200) {
//     throw new Error("Error fetching movies");
//   }

//   return {
//     totalPosts: response.data.count,
//     movies: response.data.results,
//     currentPage,
//     postsPerPage,
//   };
// }
