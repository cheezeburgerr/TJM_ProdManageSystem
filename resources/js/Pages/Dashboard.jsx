import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Alert } from "flowbite-react";

export default function Dashboard({ auth, products }) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Home" />
            <div className="bg-fixed bg-top bg-cover bg-blend-multiply" style={{ backgroundColor: 'rgb(0, 102, 102)', backgroundImage: `url(${'./images/jersey-bg.jpg'})` }}>
                <div className="text-center lg:text-start p-12 lg:p-48 text-gray-900 text-white">
                    <h1 className="text-6xl font-Bebas lg:text-[100px] font-bold mb-3">Unleash your inner beast with <span className="italic">style</span></h1>
                    <p className="mb-3">This is TJM Sportswear. Your number one sportswear apparel buddy.</p>
                    <Link href="/show-products">
                        <PrimaryButton className="rounded-none">Order Now</PrimaryButton>
                    </Link>
                </div>
            </div>
            <div className="md:columns-3 text-center font-Bebas md:text-xl">
                <div className='p-8'>
                    <p className="font-bold">High-Quality Sublimation Apparels</p>
                </div>
                <div className='p-8'>
                    <p className="font-bold">Customizable Designsp</p>
                </div>
                <div className='p-8'>
                    <p className="font-bold">High-Quality Sublimation Apparels</p>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-black overflow-hidden shadow-sm sm:rounded-lg">

                    </div>

                </div>
                <div className="">
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className=""
                        containerClass="container-with-dots"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1024
                                },
                                items: 3,
                                partialVisibilityGutter: 40
                            },
                            mobile: {
                                breakpoint: {
                                    max: 464,
                                    min: 0
                                },
                                items: 1,
                                partialVisibilityGutter: 30
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464
                                },
                                items: 2,
                                partialVisibilityGutter: 30
                            }
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                          {products.map(product => (
                            <>
                                <div key={product.product_id}>
                                    <img src={`/images/products/${product.product_image}`} alt="" className='h-24' />
                                    <p>{product.product_name}</p>

                                </div>
                            </>
                        ))}
                    </Carousel>

                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Your content here */}

                        </div>
                    </div>
                </div>

            </div>


        </AuthenticatedLayout>
    );
}
