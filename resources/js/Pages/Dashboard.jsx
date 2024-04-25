import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

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
                            <PrimaryButton  className="rounded-none">Order Now</PrimaryButton>
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
                            <div className="p-20 text-gray-900 text-white">
                                <h1 className="text-7xl text-center lg:text-start font-bold">Unleash your inner beast with style.</h1>
                            </div>
                        </div>

                        <div>
                            {products.map(product => (
                                <>
                                    <p>{product.product_name}</p>
                                </>
                            ))}
                        </div>
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
