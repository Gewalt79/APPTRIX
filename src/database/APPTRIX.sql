PGDMP     $                
    z            APPTRIX    14.2    14.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    43701    APPTRIX    DATABASE     f   CREATE DATABASE "APPTRIX" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "APPTRIX";
                postgres    false            @           1247    43717    gender    TYPE     @   CREATE TYPE public.gender AS ENUM (
    'male',
    'female'
);
    DROP TYPE public.gender;
       public          postgres    false            �            1255    43721    do_match(bigint, bigint)    FUNCTION     �  CREATE FUNCTION public.do_match(arg_sender bigint, arg_receiver bigint, OUT ret text) RETURNS text
    LANGUAGE plpgsql
    AS $$ 
    BEGIN 
        UPDATE public.user_match SET is_match=TRUE WHERE receiver=arg_sender and sender=arg_receiver; 

        ret :='none';

        IF NOT FOUND THEN 
            INSERT INTO public.user_match (sender, receiver) 
                SELECT arg_sender, arg_receiver
                    WHERE NOT EXISTS (SELECT id FROM public.user_match WHERE sender=arg_sender AND receiver=arg_receiver);
        ELSE 
            ret := (SELECT email FROM public.user WHERE id=arg_receiver);
        END IF; 

        RETURN;
    END; 
    $$;
 U   DROP FUNCTION public.do_match(arg_sender bigint, arg_receiver bigint, OUT ret text);
       public          postgres    false            �            1259    43703    user    TABLE     &  CREATE TABLE public."user" (
    id bigint NOT NULL,
    avatar character varying(32),
    first_name character varying(20),
    last_name character varying(30),
    email text,
    password character varying(32),
    gender character varying(6),
    latitude numeric,
    longitude numeric
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    43702    user_id_seq    SEQUENCE     �   ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210            �            1259    43711 
   user_match    TABLE     �   CREATE TABLE public.user_match (
    id bigint NOT NULL,
    sender bigint,
    receiver bigint,
    is_match boolean DEFAULT false
);
    DROP TABLE public.user_match;
       public         heap    postgres    false            �            1259    43710    user_match_id_seq    SEQUENCE     �   ALTER TABLE public.user_match ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_match_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            �          0    43703    user 
   TABLE DATA           q   COPY public."user" (id, avatar, first_name, last_name, email, password, gender, latitude, longitude) FROM stdin;
    public          postgres    false    210   �       �          0    43711 
   user_match 
   TABLE DATA           D   COPY public.user_match (id, sender, receiver, is_match) FROM stdin;
    public          postgres    false    212   Z       �           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 42, true);
          public          postgres    false    209                        0    0    user_match_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_match_id_seq', 2, true);
          public          postgres    false    211            i           2606    43715    user_match user_match_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_match
    ADD CONSTRAINT user_match_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.user_match DROP CONSTRAINT user_match_pkey;
       public            postgres    false    212            g           2606    43709    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    210            �   [  x���M��0���)8A����' �Bn�(� `W
� �DH�t�������#h5��8mWi���i�)km��E9"�z#'nR�X�3 F���#������V��3lJ�ۚ�ե���j�ҭ�A"`8D^r;Ю�8�#�ѱ�͟V3�������䭿KN�n2r�w���C˘���>.܋|�,�ſc=0�$z#��Hj�$�D��P�?�Y�#��� �c$[�#�Ww��������po�,�v�d3\�Ő�TI�U�=�B�%/��ZPK7�ɞ��M�Ƶ�MN�1�qX�-Zr�Mђ�CKD9;4E��;[�9��E��?_lr��MNO>`Q|��U���R׿�o}�;ŋ��Py��qT��GW���Eߡ��9e�3!%W�@�4g((����2è
:ҩf�1��"
�й�
%n�F��/�wM�U���Њ�Cη� Lnt!d�W���R�Т�b!@Tu������!�����!O� LN��RM�Bcx0UF���nG��f���:Ч�v���zx�<j����]������G�7/�u�E5��T��Z�P\0�"5+ P�T0�ڠ��,�� (���      �      x�3�4�4�,�2��@:F��� !�     