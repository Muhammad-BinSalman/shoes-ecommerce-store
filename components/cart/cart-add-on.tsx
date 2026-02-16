import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface CartAddOnProps {
    title: string;
    price: number;
    imageSrc: string;
    isSelected: boolean;
    onToggle: () => void;
}

export function CartAddOn({ title, price, imageSrc, isSelected, onToggle }: CartAddOnProps) {
    return (
        <div className=" rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <div className='flex items-center justify-between p-3'>
                <div className="flex items-center space-x-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md border border-neutral-200 bg-white">
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm max-w-44 leading-4 font-semibold text-neutral-900 dark:text-neutral-100">
                            {title}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                            +{price} PKR
                        </p>
                    </div>
                </div>

                <button
                    onClick={onToggle}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${isSelected
                        ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20'
                        : 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20'
                        }`}
                    aria-label={isSelected ? `Remove ${title}` : `Add ${title}`}
                >
                    {isSelected ? (
                        <MinusIcon className="h-4 w-4 shrink-0" />
                    ) : (
                        <PlusIcon className="h-4 w-4 shrink-0" />
                    )}
                </button>
            </div>
        </div>
    );
}
