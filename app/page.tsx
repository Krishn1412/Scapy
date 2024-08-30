import Image from "next/image"
import Searchbar from "@/components/Searchbar"
const Home = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-24 border-2 border-red-500">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping starts here
              <Image src="/assets/icons/arrow-right.svg" alt = "Arrow Right" width={16} height={16}/>
            </p>
            <h1 className="head-text">
              Unleash the power of 
              <span className="text-primary"> Scapy</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you convert, engage and retain more
            </p>
            <Searchbar/>
          </div>
          Hero Carousel
        </div>
      </section>
      <section className="trending-sections">
        <h2 className="section-text"> Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {['apple iphone', 'book', 'sneakers'].map((product) => (
            <div>{product}</div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home