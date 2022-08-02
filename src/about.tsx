// import Image form next
import ExportedImage from "next-image-export-optimizer";

export const About = () => {
  return (
    <div className="">
      <h1 className="text-6xl font-bold">{"Hi 👋, I'm tkt."}</h1>
      <h3 className="text-3xl mt-16">
        {"I'm a web application developer from Japan."}
      </h3>

      <h3 className="text-3xl mt-16">Connect with me:</h3>

      <div className="flex flex-row mt-8">
        <LinkIcon
          className="mr-4"
          href={"https://lapras.com/public/tktcorporation"}
          src="https://assets.lapras.com/static/assets/bundles/media/logo-symbol.5c8467f1.svg"
        />
        <LinkIcon
          className="mr-4"
          href={"https://github.com/tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg"
          }
        />
        <LinkIcon
          className="mr-4"
          href={"https://twitter.com/tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/twitter.svg"
          }
        />
        <LinkIcon
          className="mr-4"
          href={"https://qiita.com/tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/qiita.svg"
          }
        />
        <LinkIcon
          className="mr-4"
          href={"https://zenn.dev/tktcorporation"}
          src={"https://simpleicons.org/icons/zenn.svg"}
        />
        <LinkIcon
          className="mr-4"
          href={"https://stackoverflow.com/users/12852199"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/stackoverflow.svg"
          }
        />
        <LinkIcon
          className="mr-4"
          href={"https://instagram.com/tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg"
          }
        />
        <LinkIcon
          className="mr-4"
          href={"https://medium.com/@tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/medium.svg"
          }
        />
        <LinkIcon
          className="mr-4"
          href={"https://dev.to/tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/dev-dot-to.svg"
          }
        />
        <LinkIcon
          className="mr-4"
          href={"https://linkedin.com/in/tktcorporation"}
          src={
            "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg"
          }
        />
      </div>
      <h3 className="text-3xl mt-16">Support:</h3>
      <div className="mt-8">
        <a href="https://www.buymeacoffee.com/tktcorporation">
          <ExportedImage
            className="w-64"
            height={72}
            width={272}
            layout="intrinsic"
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
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
    <a href={href} target="blank" className={className}>
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
