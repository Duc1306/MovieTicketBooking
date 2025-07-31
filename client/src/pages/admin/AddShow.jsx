import React, { useEffect, useState } from "react";
import Title from "../../components/admin/Title";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import { CheckIcon, DeleteIcon, StarIcon } from "lucide-react";
import { kConverter } from "./../../lib/kConverter";

const AddShow = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchnowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
  };
  const handleDateTimeAdd = () => {
    // 1. Nếu người dùng chưa chọn datetime thì thoát
    if (!dateTimeInput) return;

    // 2. Tách chuỗi ISO format thành ngày và giờ
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return; // Nếu không tách được thì thoát

    // 3. Cập nhật state bằng setDateTimeSelection
    setDateTimeSelection((prev) => {
      // Lấy danh sách thời gian cũ của ngày đó (nếu chưa có thì mảng rỗng)
      const times = prev[date] || [];

      // Nếu thời gian mới chưa tồn tại trong danh sách
      if (!times.includes(time)) {
        // Thêm thời gian mới vào mảng
        return { ...prev, [date]: [...times, time] };
      }

      // Nếu đã có thì giữ nguyên
      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      // Lọc ra những time khác time cần xóa
      const filteredTimes = prev[date].filter((t) => t !== time);

      // Nếu sau khi xóa, mảng thời gian trống hoàn toàn => xóa luôn key đó khỏi object
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev; // destructuring để loại bỏ key `date`
        return rest; // Trả lại object không còn ngày đó nữa
      }

      // Nếu vẫn còn time => cập nhật lại key `date` với danh sách mới
      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  useEffect(() => {
    fetchnowPlayingMovies();
  }, []);
  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowPlayingMovies.map((movie) => (
            <div
              onClick={() => setSelectedMovie(movie.id)}
              key={movie.id}
              className="relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300"
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={movie.poster_path}
                  alt={movie.title || "movie-poster"}
                  className="w-full object-cover brightness-90"
                />
                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4 text-primary fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">
                    {kConverter(movie.vote_count)}Votes
                  </p>
                </div>
              </div>
              {selectedMovie === movie.id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                  <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              )}
              <p className="font-medium truncate">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Show Price Input  */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input
            min={0}
            placeholder="Enter show price"
            className="outline-none"
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
          />
        </div>
      </div>
      {/* Date & time Selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Select Date and Time
        </label>
        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
          <input
            className="outline-none rounded-md"
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
          />
          <button
            className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
            onClick={handleDateTimeAdd}
          >
            Add Time
          </button>
        </div>
      </div>
      {/* Díisplay Selected Times  */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2">Selected Date-Time</h2>
          <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date}>
                <div className="font-medium">{date}</div>
                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="border border-primary px-2 py-1 flex items-center rounded"
                    >
                      <span>{time}</span>
                      <DeleteIcon
                        onClick={() => handleRemoveTime(date, time)}
                        width={16}
                        height={16}
                        className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        class="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
        
      >
        Add Show
      </button>
    </>
  ) : (
    <Loading />
  );
};

export default AddShow;
