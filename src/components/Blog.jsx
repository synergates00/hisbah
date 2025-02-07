import React from "react";
import { Link } from "react-router-dom";
import { stories } from "../../storiesData";

function Blog() {
  return (
    <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
      <div id="stories" className='flex items-center justify-between'>
        <h3 className='text-teal-800 poppins-bold text-3xl md:text-5xl mt-2'>
          Activities
        </h3>
        <Link to='/' className='text-blue-500 text-sm hover:text-blue-700'>
          View All
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16'>
        {stories.slice(1).map((data, i) => (
          <article key={i} className='overflow-hidden rounded-lg shadow transition hover:shadow-lg'>
            <img
              alt=''
              src='https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              className='h-56 w-full object-cover'
            />

            <div className='bg-white p-4 sm:p-6'>
              <p className='block text-xs text-gray-500'> {data.date}</p>

              <Link to={`/story/${data.id}`}>
                <h3 className='mt-0.5 text-lg text-gray-900'>
                 {data.title}
                </h3>
              </Link>

              <p className='mt-2 line-clamp-3 text-justify text-sm/relaxed text-gray-500'>
               {data.body}
              </p>
            </div>
          </article>
        ))}
        {/* <article className='overflow-hidden rounded-lg shadow transition hover:shadow-lg'>
          <img
            alt=''
            src='https://images.unsplash.com/photo-1598777142552-edf35dc975ac?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            className='h-56 w-full object-cover'
          />

          <div className='bg-white p-4 sm:p-6'>
            <p className='block text-xs text-gray-500'>
              {" "}
              12th Jan 2024{" "}
            </p>

            <Link to='#'>
              <h3 className='mt-0.5 text-lg text-gray-900'>
                Promoting a Safe and Respectful Public Environment
              </h3>
            </Link>

            <p className='mt-2 line-clamp-3 text-justify text-sm/relaxed text-gray-500'>
              Maintaining a safe and respectful public environment benefits
              everyone in Katsina. Hisbah Katsina works to ensure public spaces
              are free from harassment, violence, and harmful activities. This
              blog post will discuss the importance of community involvement and
              individual responsibility in creating a positive atmosphere for
              all residents. It will also explore resources available through
              Hisbah Katsina to report inappropriate behavior and promote public
              safety.
            </p>
          </div>
        </article>
        <article className='overflow-hidden rounded-lg shadow transition hover:shadow-lg'>
          <img
            alt=''
            src='https://images.unsplash.com/photo-1575751639353-e292e76daca3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            className='h-56 w-full object-cover'
          />

          <div className='bg-white p-4 sm:p-6'>
            <p  className='block text-xs text-gray-500'>
              {" "}
              20th Feb 2024{" "}
            </p>

            <Link to='#'>
              <h3 className='mt-0.5 text-lg text-gray-900'>
                The Importance of Ethical Conduct in Business
              </h3>
            </Link>

            <p className='mt-2 line-clamp-3 text-justify text-sm/relaxed text-gray-500'>
              Building a strong and ethical business fosters trust within the
              community and strengthens Katsina's economy. Hisbah Katsina
              encourages businesses to operate with transparency, fairness, and
              respect for customers and employees. This blog post will explore
              practical ways businesses can integrate Islamic principles into
              their daily practices, creating a positive impact on all
              stakeholders.
            </p>
          </div>
        </article> */}
      </div>
    </div>
  );
}

export default Blog;
