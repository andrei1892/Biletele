import React, { useState } from 'react';

import {Button} from './components/Button/Button';

import './HomePage.css';


export const HomePage = (props) => {
    const {onClick} = props;
    const [isOpen, openRules] = useState(false);

    return (
        <div className='app'>
            <div className='home-menu'>
                <h3 className='home-header'>Biletele</h3>
                <div className='menu-option'>
                    <Button text={'Joaca'} extraClass={'menu-btn'} onClick={() => onClick(true)} />
                </div>
                <div className='menu-option'>
                    <Button text={'Reguli'} extraClass={'menu-btn'} onClick={() => openRules(true)} />
                </div>
                <div className='menu-style' />
            </div>
            {isOpen && (
                <div className='dialog-wrapper'>
                    <div className ='modal-container'>
                        <h3>Reguli</h3>
                        <div className="modal-content">
                            <p>Biletele este un joc de socializare alaturi de familie sau prieteni.</p>
                            <p>Primul pas este crearea echipelor si impartirea jucatorilor. Fiecare jucator va introduce un numar (agreat si stabilit la inceput) de nume proprii; optional, se poate adauga o descriere pentru cuvantul ales. </p> 
                            <p>Dupa ce fiecare jucator si-a introdus optiunile jocul poate incepe. Jocul se imparte in 3 etape asemanatoare ca desfasurare. Toate cuvintele vor fi ascunse si vor aparea pe rand.</p>
                            <p>Fiecare jucator va avea randul de a descrie coechipierilor cuvantul afisat pe ecran; timp de 45 de secunde el trebuie sa descrie cat mai multe cuvinte. Daca coechipierii ghicesc cuvantul va trece mai departe, iar daca nu, runda lui se incheie. </p>
                            <p>In prima etapa, termenul poate fi descris in 3 cuvinte. In a doua etapa un singur cuvant. Iar in ultima etapa, se va mima cuvantul afisat.</p>
                            <p>Fiecare cuvant ghicit reprezinta un punct pentru echipa respectiva; punctele se aduna in fiecare etapa pentru clasamentul final.</p>
                        </div>
                        <Button
                            onClick={() => openRules(false)}
                            text={'Inapoi'}
                            extraClass={'menu-btn'}
                        />
                    </div>
                    <div className='overlay' onClick={() => openRules(false)} />
                </div>
                )
            }
        </div>
    )
}