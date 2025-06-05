import ExportedImage from "next-image-export-optimizer";
import bmcButton from "./assets/bmc-button.svg";
const profilePic = "https://avatars.githubusercontent.com/u/37575408?v=4";

export const About = () => {
  return (
    <div className="mx-auto max-w-lg rounded-xl bg-slate-800/60 p-8 text-center backdrop-blur-md shadow-2xl">
      <ExportedImage
        src={profilePic}
        alt="tkt profile"
        className="mx-auto rounded-full shadow-lg"
        width={160}
        height={160}
        priority
      />
      <h1 className="text-6xl font-bold text-white mt-8">
        {"Hi 👋, I'm tkt."}
      </h1>
      <h3 className="text-3xl mt-4 text-slate-300">
        {"I'm a web application developer from Japan."}
      </h3>

      <h3 className="text-3xl mt-12 text-slate-200">Connect with me:</h3>

      <div className="flex justify-center mt-8 flex-wrap gap-4">
        <LinkIcon
          className=""
          href={"https://lapras.com/public/tktcorporation"}
          src="https://assets.lapras.com/static/assets/bundles/media/logo-symbol.5c8467f1.svg"
        />
        <LinkIcon
          className=""
          href={"https://github.com/tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg"
          }
        />
        <LinkIcon
          className=""
          href={"https://twitter.com/tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/twitter.svg"
          }
        />
        <LinkIcon
          className=""
          href={"https://qiita.com/tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/qiita.svg"
          }
        />
        <LinkIcon
          className=""
          href={"https://zenn.dev/tktcorporation"}
          src={"https://simpleicons.org/icons/zenn.svg"}
        />
        <LinkIcon
          className=""
          href={"https://stackoverflow.com/users/12852199"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/stackoverflow.svg"
          }
        />
        <LinkIcon
          className=""
          href={"https://instagram.com/tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg"
          }
        />
        <LinkIcon
          className=""
          href={"https://medium.com/@tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/medium.svg"
          }
        />
        <LinkIcon
          className=""
          href={"https://dev.to/tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/dev-dot-to.svg"
          }
        />
        <LinkIcon
          className=""
          href={"https://linkedin.com/in/tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg"
          }
        />
      </div>
      <h3 className="text-3xl mt-12 text-slate-200">Support:</h3>
      <div className="mt-8">
        <a href="https://www.buymeacoffee.com/tktcorporation" target="blank">
          <ExportedImage
            className="w-64"
            height={72}
            width={272}
            src={bmcButton}
            alt="buymeacoffee for tktcorporation"
          />
        </a>
      </div>
    </div>
  );
};

const LinkIcon = ({
  href,
  src,
  className,
}: {
  href: string;
  src: string;
  className: string;
}) => {
  return (
    <a
      href={href}
      target="blank"
      className={`${className} transition-transform hover:scale-110 hover:opacity-80`}
    >
      <ExportedImage
        className="h-10 w-10 md:h-16 md:w-16"
        style={{
          filter:
            "invert(88%) sepia(61%) saturate(0%) hue-rotate(229deg) brightness(107%) contrast(101%)",
        }}
        width={64}
        height={64}
        src={src}
        alt={href}
      />
    </a>
  );
};
