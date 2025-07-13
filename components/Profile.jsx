import Loading from "./Loading";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, isLoading, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {isLoading ? (
        <div className="mt-16 pl-40">
          <Loading />
        </div>
      ) : (
        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post._id)}
              handleDelete={() => handleDelete && handleDelete(post._id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;
