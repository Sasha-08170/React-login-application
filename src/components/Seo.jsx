// components/Seo.jsx
import { Helmet } from "react-helmet";

const Seo = ({
    title,
    description,
    keywords,
    canonical,
    image,
    type,
    siteName,
}) => {
    return (
        <Helmet>
            {/* Title & Description */}
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Canonical */}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph (Facebook/Telegram/etc.) */}
            <meta property="og:title" content={title} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:type" content={type} />
            {canonical && <meta property="og:url" content={canonical} />}
            {siteName && <meta property="og:site_name" content={siteName} />}
            {image && <meta property="og:image" content={image} />}

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {description && <meta name="twitter:description" content={description} />}
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    );
};

export default Seo;
