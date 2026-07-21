import React from "react";
import {
  MessageCircle,
  Mail,
  Calendar,

} from "lucide-react";

import Delete from "@/components/Delete"; 

interface doctorId{
    doctorId:string
}

const ShowComments = async ({doctorId} : doctorId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/showcomments/${doctorId}`,
    {
      cache: "no-store",
    }
  );

  const comments = await res.json();
 
    

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Recent Comments
          </h2>
          <p className="text-gray-500 mt-1">
            Your latest posted comments.
          </p>
        </div>

        <div className="bg-red-600 text-white px-5 py-2 rounded-xl font-semibold shadow">
          {comments.length} Comments
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-5">
        {comments.map((comment: any) => (
          <div
            key={comment._id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Top */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {comment.name}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <Mail size={15} />
                    {comment.email}
                  </span>

                  <span className="flex items-center gap-2">
                    <Calendar size={15} />
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleDateString()
                      : "Today"}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
              

                <Delete deleteId={comment._id} endpoint="deleteComment" ></Delete>
              </div>
            </div>

            {/* Comment */}
            <div className="mt-5">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <MessageCircle size={18} />
                <span className="font-semibold">Comment</span>
              </div>

              <p className="text-gray-700 leading-8">
                {comment.comments}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {comments.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center mt-6">
          <MessageCircle className="mx-auto text-red-500" size={55} />
          <h3 className="mt-4 text-2xl font-bold text-gray-700">
            No Comments Yet
          </h3>
          <p className="mt-2 text-gray-500">
            Your posted comments will appear here.
          </p>
        </div>
      )}
    </section>
  );
};

export default ShowComments;