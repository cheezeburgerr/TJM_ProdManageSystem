import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function OrderCategory({ auth, products }) {
    return (
        <AuthenticatedLayout user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
            <Head title="Select Order" />
            <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex place-content-center">
                    <h1 className="text-2xl rounded-md uppercase tracking-widest font-semibold text-center mb-3  p-4">Select an
                        apparel</h1>

                </div>
                <div className="px-4 lg:px-0 columns-2 md:columns-3 h-full place-content-center">
                    {products.map((item) => (
                        <Link href={`/order/${item.id}`}>
                            <a>
                                <div class="shadow-md mb-4 transition ease-in-out delay-150 hover:scale-105 bg-white hover:shadow-lg hover:shadow-teal-100 duration-300 break-inside-avoid-column">
                                    <img src={`/images/products/${item.product_image}`}
                                        alt={item.product_name} />
                                    <div class="p-5">
                                        <div class="uppercase font-semibold tracking-widest text-xs flex justify-between">
                                            <p>{item.product_name}</p>
                                            <p class="text-lg font-bold tracking-wide">{item.product_price}.00</p>
                                        </div>
                                    </div>

                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
            </div>
        </AuthenticatedLayout>
    )
}
