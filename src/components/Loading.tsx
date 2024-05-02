function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex gap-4">
        <div className="h-4 w-4 animate-[jump_1.5s_ease-in-out_infinite] rounded-full bg-green-500 delay-100"></div>
        <div className="h-4 w-4 animate-[jump_1.5s_0.3s_ease-in-out_infinite] rounded-full bg-rose-500"></div>
        <div className="h-4 w-4 animate-[jump_1.5s_0.5s_ease-in-out_infinite] rounded-full bg-yellow-500"></div>
        <div className="h-4 w-4 animate-[jump_1.5s_0.9s_ease-in-out_infinite] rounded-full bg-blue-500"></div>
      </div>
    </div>
  );
}

export default Loading;
