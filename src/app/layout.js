import { Providers } from "@/redux/store/providers";
import "../../public/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

export const revalidate = 3600;

export const generateMetadata = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_END_POINT}get-system-settings`
    );
    const favicon = response?.data?.data?.favicon_icon;
    const placeApiKey = response?.data?.data?.place_api_key;
    return {
      icons: [
        {
          url: favicon,
        },
      ],
      placeApiKey,
    };
  } catch (error) {
    console.error("Error fetching MetaData:", error);
    return null;
  }
};

export default async function RootLayout({ children }) {
  const metadata = await generateMetadata();
  const placeApiKey = metadata?.placeApiKey;

  return (
    <html lang="en" web-version={process.env.NEXT_PUBLIC_WEB_VERSION}>
      <Head>
        {/* Core CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />

        {/* ✅ PWA META TAGS */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#005AE0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Other tools */}
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <script src="https://js.paystack.co/v1/inline.js"></script>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${placeApiKey}&libraries=places&loading=async`}
        ></script>
      </Head>

      <body>
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
