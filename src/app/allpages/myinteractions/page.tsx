import {
  MessageCircle,
  Heart,
  Trash2,
  Calendar,
  Mail,
  User,
} from "lucide-react";

const MyInteractionsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
    cache: "no-store",
  });

  const comments = await res.json();

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              My Interactions
            </h1>

            <p className="mt-2 text-gray-500">
              Manage all your comments in one place.
            </p>
          </div>

          <div className="rounded-xl bg-red-600 px-6 py-3 text-white font-bold shadow-lg">
            Total Comments: {comments.length}
          </div>
        </div>

        <div className="space-y-6">
          {comments.map((comment: any) => (
            <div
              key={comment._id}
              className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {comment.name}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <Mail size={16} />
                      {comment.email}
                    </span>

                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString()
                        : "Today"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 rounded-xl bg-pink-100 px-4 py-2 text-pink-600 hover:bg-pink-600 hover:text-white transition">
                    <Heart size={18} />
                    Like
                  </button>

                  <button className="rounded-xl bg-red-100 p-3 text-red-600 hover:bg-red-600 hover:text-white transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-3 flex items-center gap-2 text-red-600">
                  <MessageCircle size={18} />
                  <span className="font-semibold">Comment</span>
                </div>

                <p className="leading-8 text-gray-700">{comment.comments}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyInteractionsPage;
