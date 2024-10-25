import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { ModalComponent } from './modal/modal.component'; 

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private modals: ComponentRef<ModalComponent>[] = [];

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    showModal(viewContainerRef: ViewContainerRef, title: string, content: string, buttons: string[] = ['OK']): Promise<string> {
        return new Promise((resolve, reject) => {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
            const componentRef = viewContainerRef.createComponent(componentFactory);

            // Set modal title, content, and buttons
            componentRef.instance.title = title;
            componentRef.instance.content = content;
            componentRef.instance.buttons = buttons;

            // Listen for the modal's close event and resolve the promise with the result
            componentRef.instance.closeEvent.subscribe((result: string) => {
                this.removeModal(componentRef);
                resolve(result);  // Resolve the promise with the result (button clicked)
            });

            // Handle the case where the modal needs to be removed manually
            this.modals.push(componentRef);
        });
    }

    private removeModal(componentRef: ComponentRef<ModalComponent>) {
        const index = this.modals.indexOf(componentRef);
        if (index !== -1) {
            this.modals[index].destroy();
            this.modals.splice(index, 1);
        }
    }
}
