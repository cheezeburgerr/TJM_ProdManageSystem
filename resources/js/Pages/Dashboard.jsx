import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Carousel from 'react-multi-carousel';
import { Card } from 'flowbite-react';
import 'react-multi-carousel/lib/styles.css';
import { Alert } from "flowbite-react";

import ALink from '@/Components/ALink';
import { Time } from 'react-ionicons';
import ProductCarousel from '@/Components/ProductCarousel';
import ChatBox from '@/Components/Messages/ChatBox';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

export default function Dashboard({ auth, products, gallery }) {


    const rootUrl = "http://127.0.0.1:8000";
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Home" />

            {auth.user !== null && (
                <ChatBox rootUrl={rootUrl} userid={auth.user.id} />
            )}
            <div className="bg-fixed bg-top bg-cover">
                <div className="text-center lg:text-start p-12 lg:p-16 lg:px-24 flex flex-col items-center text-gray-50 bg-gray-950">
                    <h1 className="text-6xl text-center font-Bebas md:text-[120px] font-bold mb-3 ">Sweat It Out In<span className="italic text-teal-500"> style</span></h1>
                    <p className="mb-3 text-lg">This is TJM Sportswear. Your number one sportswear apparel buddy.</p>
                    <Link href="/show_products">
                        <PrimaryButton className="rounded-none">Order Now</PrimaryButton>
                    </Link>
                </div>
            </div>

            <div className="md:columns-3 text-center font-Bebas text-2xl bg-teal-500 text-gray-100">
                <div className='p-4 md:p-2 border-r-2'>
                    <p className=""> High-Quality Sublimation Apparels</p>
                </div>
                <div className='p-4 md:p-2 border-r-2 '>
                    <p className="">Customizable Designs</p>
                </div>
                <div className='p-4 md:p-2'>
                    <p className="">High-Quality Sublimation Apparels</p>
                </div>
            </div>

            <div className="">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-black overflow-hidden  sm:rounded-lg">

                    </div>

                </div>
                <div className="p-4 lg:p-12">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="font-bold font-Bebas mb-4 text-2xl">Featured Designs</h1>
                        </div>
                        <div>
                            <Link href={'/product_gallery'}>
                                <PrimaryButton className='rounded-none'>View All</PrimaryButton>
                            </Link>
                        </div>
                    </div>
                    <ProductCarousel>
                        {gallery.map(product => (
                            <>
                                <Link href={`/product_gallery/${product.id}`}>
                                    <div key={product.product_id} className='p-2 cursor-pointer  mb-4 transition ease-in-out delay-150 hover:scale-105   duration-300'>
                                        <LazyLoadImage
                                            src={`/images/gallery/${product.image}`}
                                            alt={product.name}
                                            className="h-56 w-full object-cover rounded-t-none"

                                        />
                                        <Card
                                            className="max-w-sm h-sm rounded-none "
                                        >

                                            <div className="">
                                                <h5 className="truncate text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-Bebas">
                                                    {product.name}
                                                </h5>
                                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                                    {product.products.product_price}.00
                                                </p>
                                            </div>
                                        </Card>
                                    </div></Link>
                            </>
                        ))}
                    </ProductCarousel>
                    <div className="p-4 mb-4">
                        <p className="font-semibold font-Bebas text-5xl text-center text-gray-950">Custom Orders</p>
                        <p className='text-lg text-center'>You can order a product with your own design. Just pick one of our available apparels.</p>
                    </div>
                    <ProductCarousel>
                        {products.map(product => (
                            <>
                                <Link href={`/custom_order/${product.id}`}>
                                    <div key={product.product_id} className='p-2 cursor-pointer  mb-4 transition ease-in-out delay-150 hover:scale-105   duration-300'>
                                        <img
                                            src={`/images/products/${product.product_image}`}
                                            alt={product.product_name}
                                            className="h-56 w-full object-cover rounded-t-none"
                                            loading="lazy"
                                        />
                                        <Card
                                            className="max-w-sm h-sm rounded-none "
                                        >

                                            <div className="">
                                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-Bebas">
                                                    {product.product_name}
                                                </h5>
                                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                                    {product.product_price}.00
                                                </p>
                                            </div>
                                        </Card>
                                    </div></Link>
                            </>
                        ))}
                    </ProductCarousel>



                </div>

                <div className='lg:columns-2 bg-gray-950'>
                    <div className='break-inside-avoid-column p-12'>
                        <h3 className="font-bold font-Bebas text-4xl text-gray-100 mb-3">Customize your design!</h3>
                        <p className='text-gray-100 text-lg mb-3'>Interact with our 3D Jersey Designer to visualize what will the look of your design in final form.</p>
                        <Link href={route('configurator')}>
                            <ALink className='rounded-none' >Open 3D Designer</ALink>
                        </Link>
                    </div>
                    <div className='bg-cover bg-center h-96 break-inside-avoid-column' style={{ backgroundImage: `url(${'./images/basketballplayer.jpg'})` }}>
                        {/* <img src="/images/basketballplayer.jpg" alt="" className={'w-full '} /> */}
                    </div>

                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                </div>

            </div>


        </AuthenticatedLayout>
    );
}
