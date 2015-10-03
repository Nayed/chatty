<?php 

use Ratchet\MessageComponentInterface;

class Chat implements MessageComponentInterface
{
    protected $clients;

    public function __construct()
    {
        $this->clients = splObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
    }

    public function onMessage(ConnectionInterface $conn, $msg)
    {
        foreach ($this->clients as $client)
        {
            if ($client !== $conn)
                $client->send($msg);
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
    }

    public function onError(ConnectionInterface $conn, Exception $e)
    {
        echo "The following error occured: " . $e->getMessage();
        $conn->close();
    }
}