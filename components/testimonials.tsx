import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center md:space-y-12">
          <h2 className="text-3xl md:text-5xl font-bold">
            Loved by thousands of shoe lovers across Pakistan
          </h2>
          <p className="text-base text-gray-600 text-center mb-12 max-w-2xl mx-auto px-7">
            Our customers love our shoes and service. Here’s what they say about
            shopping with us.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
          <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
            <CardHeader>
              <Image
                className="h-6 w-fit "
                src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
                alt="Nike Logo"
                height="24"
                width="24"
              />
            </CardHeader>
            <CardContent>
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-xl font-medium">
                  Ok the quality of this shoes are good and style is wonderful I
                  really appreciate you to give your customers this type of
                  shoes and such a good quality and style and price
                </p>
                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/shekinah.webp"
                      alt="Ayan Ahmed"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>AH</AvatarFallback>
                  </Avatar>

                  <div>
                    <cite className="text-sm font-medium">Ayan Ahmed</cite>
                    <span className="text-muted-foreground block text-sm">
                      Gilgit Baltistan, PK
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-xl font-medium">
                  Shoes are in very good condition. The pictures they have on
                  the website are more or less same as their original condition.
                  Looking forward to more collections in future
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/jonathan.webp"
                      alt="Usman Raza"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>AA</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">Ashhar Ahmad</cite>
                    <span className="text-muted-foreground block text-sm">
                      Karachi, PK
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  3rd time order kar rahi hun, quality top notch ha as always,
                  prices boht reasonable hain compared to other thrift stores
                </p>

                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/yucel.webp"
                      alt="Sadia Malik"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">Sadia Malik</cite>
                    <span className="text-muted-foreground block text-sm">
                      Islamabad, PK
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card className="card variant-mixed">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  Quality 10/10 ha especially in this price tag, I love your
                  page, dubara order karu ga next month ❤
                </p>

                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/rodrigo.webp"
                      alt="Ali Hamza"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>AH</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Ali Hamza</p>
                    <span className="text-muted-foreground block text-sm">
                      Multan, PK
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
