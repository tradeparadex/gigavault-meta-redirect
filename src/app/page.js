export const runtime = "edge";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const response = await fetch('https://api.prod.paradex.trade/v1/vaults/summary?address=0x5f43c92dbe4e995115f351254407e7e84abf04cbe32a536345b9d6c36bc750f', {
    method: 'GET',
    headers: {},
  });
  const data = await response.json();
  const apr = (data.results[0].last_month_return*100).toFixed(2);
  console.log(apr);

 
  return {
    title: `Gigavault LP : ${apr}% APR`,
    description: 'The Liquidity Provider vault powers liquidity across all Paradex perpetuals markets through advanced market-making strategies while accruing platform fees',
    openGraph: {
      title: `Gigavault LP ${apr}% APR`,
      description: 'The Liquidity Provider vault powers liquidity across all Paradex perpetuals markets through advanced market-making strategies while accruing platform fees',
      images: ['https://cdn.prod.website-files.com/632b1650d518e93de132751a/672d77008484f81e6fe6621b_Paradex-GIGAVAULT.webp'],
    },
  }
}
 

export default async function Home() {
  return (
    <div></div>
  );
}
