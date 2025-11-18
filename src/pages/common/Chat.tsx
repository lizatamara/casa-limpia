import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send } from 'lucide-react';
import { appState } from '@/utils/mockData';
import { Message } from '@/types';

const Chat = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const booking = appState.bookings.find(b => b.id === bookingId);
  const otherUserId = user?.role === 'client' ? booking?.workerId : booking?.clientId;
  const otherUser = otherUserId ? appState.users[otherUserId] : null;

  useEffect(() => {
    if (bookingId) {
      const bookingMessages = appState.messages.filter(m => m.bookingId === bookingId);
      setMessages(bookingMessages);
      
      // Marcar mensajes como leídos
      bookingMessages.forEach(m => {
        if (m.senderId !== user?.id) {
          m.read = true;
        }
      });
    }
  }, [bookingId, user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim() || !user || !bookingId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      bookingId,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    appState.messages.push(newMessage);
    setMessages([...appState.messages.filter(m => m.bookingId === bookingId)]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!booking || !otherUser) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Reserva no encontrada</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const backRoute = user?.role === 'client' ? '/client/bookings' : '/worker/bookings';

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to={backRoute}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-primary">{otherUser.name}</h1>
            <p className="text-sm text-muted-foreground">
              {booking.serviceType} - {new Date(booking.date).toLocaleDateString('es-CL')}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No hay mensajes aún. ¡Inicia la conversación!
                </CardContent>
              </Card>
            ) : (
              messages.map((msg) => {
                const isOwnMessage = msg.senderId === user?.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        isOwnMessage
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(msg.timestamp).toLocaleTimeString('es-CL', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-card border-t sticky bottom-0">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
