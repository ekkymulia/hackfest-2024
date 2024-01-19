import { Button, Card, CardBody, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, CardHeader } from "@nextui-org/react";
import React from "react";

const CardSubscription = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Card>
        <CardBody>
          <Button variant="light" onPress={onOpen}>
            Upgrade to Premium
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="max-w-3xl py-5 sm:w-full max-h-screen overflow-y-auto">
              <ModalHeader className="flex flex-col gap-1">Upgrade to Premium</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-4 mt-5">
                  <Card className="py-8">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col">
                      <h4 className="font-bold text-2xl text-center">Starter Plan</h4>
                      <h4 className="font-bold text-8xl text-center mt-5 text-green-500">$49</h4>
                      <p>/month</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 text-center mt-5">
                      <p>Unlimited Basic Projects</p>
                      <p>Streamlined Hiring</p>
                      <p>Reliability Assurance</p>
                    </CardBody>
                    <div className="flex justify-center align-center">
                      <Button type="button" className="my-4 w-24 font-bold " color="primary">
                        Buy
                      </Button>
                    </div>
                  </Card>

                  <Card className="py-8">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col">
                      <h4 className="font-bold text-2xl text-center">Business Plan</h4>
                      <h4 className="font-bold text-8xl text-center mt-5 text-green-500">$99</h4>
                      <p>/month</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 text-center mt-5">
                      <p>Enhanced Project Scope</p>
                      <p>Priority Support</p>
                      <p>Exclusive Promotions</p>
                    </CardBody>
                    <div className="flex justify-center align-center">
                      <Button type="button" className="my-4 w-24 font-bold " color="primary">
                        Buy
                      </Button>
                    </div>
                  </Card>

                  <Card className="py-8">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col">
                      <h4 className="font-bold text-2xl text-center">Enterprise Plan</h4>
                      <h4 className="font-bold text-8xl text-center mt-5 text-green-500">$199</h4>
                      <p>/month</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 text-center mt-5">
                      <p>Premium Freelancer Pool</p>
                      <p>Customized Solutions</p>
                      <p>Strategic Account Management</p>
                    </CardBody>
                    <div className="flex justify-center align-center">
                      <Button type="button" className="my-4 w-24 font-bold " color="primary">
                        Buy
                      </Button>
                    </div>
                  </Card>
                </div>
              </ModalBody>

              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </ModalContent>
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardSubscription;
