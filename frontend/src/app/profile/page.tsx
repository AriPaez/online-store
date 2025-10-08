"use client";

import { useAuth } from '@/context/AuthProvider';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <main>
        {!user ? (
          <Container className="py-12">
            <h2 className="text-xl font-bold">No estás logueado</h2>
            <p>Por favor iniciá sesión para ver tu perfil.</p>
          </Container>
        ) : (
          <Container className="py-12">
            <h2 className="text-2xl font-bold mb-4">Mi perfil</h2>
            <div className="space-y-2">
              <div>DNI: {user.dni_user}</div>
              <div>Nombre: {user.name}</div>
              <div>Email: {user.email}</div>
            </div>
          </Container>
        )}
      </main>
      <Footer />
    </>
  );
}
